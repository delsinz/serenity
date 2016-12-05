
var randomString = require('randomstring');
var messaging = require('../config/plivo');
var emailer = require('../config/nodemailer');
var message = "Welcome to Serenity :D praise be my genius creator Hamza and btw this is your verification code is: "

var VerificationModel = function(){
    
};

VerificationModel.prototype.createVerification = function(db, user, callback) {
emailVerification = randomString.generate(40)
db.cypher({
    query:'MATCH (m:User) WHERE ID(m)={id}'+
            ' CREATE(n:Verification {emailVerification: {emailVerification}, '+
            'phoneVerification: {phoneVerification}}) '+
            'CREATE (m)-[:PENDING]->(n) return n,m',
    params: {
        id: user._id,
        emailVerification: emailVerification,
        phoneVerification: randomString.generate(6)
    }
}, function(err, results){
    if (err) throw err;
    emailer.sendEmail(results[0].m.properties.Email, results[0].m.properties.UserName, emailVerification, function(){
        callback(results[0].n.properties)
    })
})
}

VerificationModel.prototype.VerifyPhone = function(db, user, code, callback) { 
db.cypher({
    query: 'MATCH (m:User {UserName:{username}}),'+
            '(n:Verification), (m)-[:PENDING]->(n)'+
            'return n',
    params: {
        username: user
    }
},
function(err, results){
    if (err) throw err;
    
    var actualCode = results[0].n.properties.phoneVerification;
    if (code===actualCode){
            db.cypher({
            query: 'MATCH (m:User {UserName:{username}}), (n:Verification), (m)-[:PENDING]->(n) SET m.isVerifiedPhone={isVerifiedPhone} DETACH DELETE n',
            params: {
                username: user,
                isVerifiedPhone: true
            }
        },function(err){
            if (err) throw err;
            callback(true);
        })
    } else{
        callback(false);
    }
})
}

VerificationModel.prototype.VerifiyEmail = function(db, user, code, callback) { 
db.cypher({
    query: 'MATCH (m:User {UserName: {userName}}),'+
            '(n:Verification), (m)-[:PENDING]->(n)'+
            'return n',
    params: {
        userName: user
    }
},
function(err, results){
    if (err) throw err;
    
    var actualCode = results[0].n.properties.emailVerification;
    if (code===actualCode){
        db.cypher({
            query: 'MATCH (m:User {UserName: {userName}}),'+
                '(n:Verification), (m)-[:PENDING]->(n)'+
                'SET m.isVerifiedEmail={isVerifiedEmail} DETACH DELETE n',
            params: {
                userName: user,
                isVerifiedEmail: true
            }
        },function(err){
            if (err) throw err;
            callback(true);
        })
    } else{
        callback(false);
    }
})
}

VerificationModel.prototype.ResendLink = function(db, user, callback) { 
db.cypher({
    query: 'MATCH (m:User {UserName: {userName}}),'+
            '(n:Verification), (m)-[:PENDING]->(n)'+
            'return n,m',
    params: {
        userName: user
    }
},
function(err, results){
    if (err) throw err;
    if(results[0]){
        var actualCode = results[0].n.properties.emailVerification;
        emailer.sendEmail(results[0].m.properties.Email, user, actualCode, function(){
            return callback(results[0].n.properties)
        })
    }
    //callback(false);
    
})
}

module.exports = new VerificationModel();