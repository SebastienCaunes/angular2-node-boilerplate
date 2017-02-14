/**
 * Created by mgarabos on 22/05/2014.
 */
'use strict';

var config = require('./config');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
var templatesDir = path.resolve(__dirname, '..', 'email_templates');
var emailTemplates = require('email-templates');

var EmailAddressRequiredError = new Error('email address required');
var SubjectRequiredError = new Error('subject required');

// create a defaultTransport using authentication that are
// storeed in the config file.
var defaultTransport = nodemailer.createTransport(smtpTransport({
    service: config.mailer.service,
    auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass
    }
}));

exports.sendOne = function (templateName, locals, fn) {
    // make sure that we have an user email
    if (!locals.email) {
        return fn(EmailAddressRequiredError);
    }
    // make sure that we have a message
    if (!locals.subject) {
        return fn(SubjectRequiredError);
    }
    emailTemplates(templatesDir, function (err, template) {
        if (err) {
            return fn(err);
        }
        // Send a single email
        template(templateName, locals, function (err, html, text) {
            if (err) {
                return fn(err);
            }

            var transport = defaultTransport;
            transport.sendMail({
                from: config.mailer.defaultFromAddress,
                to: locals.email,
                subject: locals.subject,
                html: html,
                // generateTextFromHTML: true,
                text: text
            }, function (err, responseStatus) {
                if (err) {
                    return fn(err);
                }
                return fn(null, responseStatus.message, html, text);
            });
        });
    });
};