/**
 * Created by nicolascunin on 09/11/2015.
 */
'use strict';

// manage user specific model (MAM'Oz users and MAM'Oz customers ie parents)
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashed_password: String,
    salt: String,
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['unknown', 'parent', 'admin'],
        default: 'unknown'
    },
    emailConfirmationToken: String,
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    children: [{
        fullName: String,
        picture: String
    }],
    picture: String,
    phoneNumber: String,
    peopleToContactInCaseOfEmergency: [
        {
            fullName: String,
            phoneNumber: String
        }
    ]
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.hashPassword(password);
}).get(function () {
    return this._password;
});

UserSchema.path('hashed_password').validate(function (hashed_password) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    if (!this.provider) return true;
    return (typeof hashed_password === 'string' && hashed_password.length > 0);
}, 'Password cannot be blank');

UserSchema.path('firstName').validate(function (firstname) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    if (!this.provider) return true;
    return (typeof firstname === 'string' && firstname.length > 0);
}, 'First Name cannot be blank');

UserSchema.path('lastName').validate(function (lastname) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    if (!this.provider) return true;
    return (typeof lastname === 'string' && lastname.length > 0);
}, 'Last Name cannot be blank');

UserSchema.path('email').validate(function (email) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    if (!this.provider) return true;
    return (typeof email === 'string' && email.length > 0);
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    if (!this.provider) return true;
    return (typeof hashed_password === 'string' && hashed_password.length > 0);
}, 'Password cannot be blank');

/**
 * Methods
 */
UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function (plainText) {
        return this.hashPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Hash password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    hashPassword: function (password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

mongoose.model('User', UserSchema);
