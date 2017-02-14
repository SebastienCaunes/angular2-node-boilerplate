'use strict';
var nodemailer = require('nodemailer');
var mails = require('../config/mails');

exports.contactUs = function(req, res)
{
    var message = req.body;

    var locals = {
        host: req.headers.host,
        //email: 'laadmin31@gmail.com',
        email: 'niconaute@gmail.com',
        from: message.from,
        subject: 'Demande d\'informations de la part de ' + message.completeName,
        completeName: message.completeName,
        message: message.message
    };

    mails.sendOne('contactUs', locals, function ( err )
    {
        if(err)
        {
            console.error('Could not send email to contact us...', err);
            return res.sendStatus(500).end();
        }
        return res.sendStatus(200).end();
    });
};