/**
 * constructor for MessagingAPI
 * @class
 */

MessagingAPI = function() {
    
}
var plivo = require('plivo');
var pAPI = plivo.RestAPI({
    authId: 'MAODG2NJG2MJU3MDDHY2',
    authToken: 'NzdkNzg0MjU0MWVhZWM3N2M3MDllNDg3MWJkNzY0'
})

/**
 * Sends SMS to proivded number
 * @param {string} destination - the number to send the sms to (with interanational dialing code)
 * @param {string} message - message to be sent
 * @param {MessagingAPI~callback} callback - callback to the function  
 */
MessagingAPI.prototype.sendMessage = function(destination, message, callback) {
    var params = {
        'src': 'Serenity',
        'dst': destination,
        'text': message
    };

    pAPI.send_message(params, function(status, response){
        callback(status,response);
    })
};
/**
 * Callbcak to the sending of a message
 * @callbback MessagingAPI~callback
 * @param {string} status - status of the response
 * @param {string} response - the message of if was successful or if/why it failed
 */

module.exports = new MessagingAPI();