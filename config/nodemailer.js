/**
 * @module jsonwebtoken
 * @file Provides an interface for authentication
 * @requires config
 * @requires jwt-simple
 */

var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');

/**
 * constructor of mailer
 * @class
 */
var mailer = function() {
    
};

var transporter = nodemailer.createTransport(ses({
    accessKeyId: 'AKIAJB6VPAWOLWXVTDRQ',
    secretAccessKey: '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',
    region: "us-west-2"
    
}));

/**
 * Sends Verification Email to provided email address
 * @param {string} destination - Email to sent the verificaiton to
 * @param {string} verificationCode - The verification code to be sent
 * @param {mailer~sendEmailcallback} callback - callback to the function
 */
mailer.prototype.sendEmail = function(destination, userName, verificationCode, callback) {
    transporter.sendMail({
        from: 'Serenity <verified.serenity@gmail.com>',
        to: destination,
        subject: 'do-not-reply: Serenity Verification',
        text: 'Welcome to Serenity hope you have an awesome time, Your Verification link is: http://104.236.121.170:3000/v/'+userName+'/' + verificationCode
    }, function(err, info) {
        if (err) throw err;
        console.log(info)
        callback(info);
    });
}


/**
 * Callback to the send email
 * @callback mailer~sendEmailcallback
 * @param {Object} info - returns info about the email
 */

module.exports = new mailer();