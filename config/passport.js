//LocalStrategy for singing in using username + password
var LocalStrategy = require('passport-local').Strategy;

//adds Database connection
var User = require ('../model/user_model');

// expose this function to our app using module.exports
module.exports = function(db, passport) {
    //stores a session of the user in cookie
    passport.serializeUser(function(user,done){
        done(null,user.UserName)
    });
    //retrieves session of the user from cookie
    passport.deserializeUser(function(UserName, done) {
        User.findUser(db, UserName, function(user){
            if (user===null) {
                done(null, false);
            } else {
                done(null, user);
            }
        })
    });
    //setups local sign up via username and password
    passport.use('local-signup', new LocalStrategy({
        usernameFeild : 'username',
        passwordFeild : 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        // asynchronous User.findUser wont fire unless data is sent back
        process.nextTick(function(){
            //find the user in database
            User.findUser(db, username, function(temp) {
                //if user doesnt exist make it
                if (temp===null) {
                    //create a secure password
                    var securePassword = User.generateHash(password);
                    //create the User in the database
                    User.createUser(db, username, securePassword, req.body.email, req.body.phoneNumber, req.body.country, 'default', function(newUser){
                        return done(null, newUser, req.flash('succMessage', 'Welcome to our humble abode ' + username));
                    });
                } else {
                    return done(null, false, req.flash('authMessage', 'That username is already taken.'));
                }
            });
        })
    }));
    
    //setsup login using username and password
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        //finds user in database
        User.findUser(db, username, function(temp) {
            //if doesnt exist dont let the user in
            if (temp===null) {
                return done(null, false, req.flash('authMessage', 'That username does not exist.'));
            }

            if (!User.validPassword(temp.Password, password)) {
                //if invalid password don't let user in
                return done(null, false, req.flash('authMessage', 'Incorrect Password.'));
            }

            return done(null, temp, req.flash('succMessage', 'Welcome back ' + temp.UserName));
        })
    }))
}
