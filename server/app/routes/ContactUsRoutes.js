'use strict';

var ContactUsController = require('../controllers/ContactUsController');

module.exports = function(app)
{
    // friends list, get one, add one and remove one
    app.route('/contactus')
        .post(ContactUsController.contactUs);
};