var jwt = require('../config/jsonwebtoken')
var user = require('../model/user_model')

module.exports = function(app, db, isLoggedIn) {
    app.get('/u/:username', isLoggedIn, function(req,res){
        console.log(req.params.username)
        res.render('../public/User/index.ejs', {url:"http://104.236.121.170:3000/", username: req.params.username})
    })
    /**
     * @api {get} /logout
     * @apiName GetLogout
     * @apiGroup User
     * @apiDescription Does nothing as Logout is client side deleteing of token
     * @apiSuccess {Boolean} success True if successful
     * @apiSuccess {String} message just says Logged out
     */
    app.get('/api/logout', function(req,res) {
        res.json({success: true, message:"Logged out"})
    });

    /**
     * @api {post} /user
     * @apiName PostUser
     * @apiGroup User
     * @apiDescription Creates User
     *
     * @apiParam {String} username Username of the user to create
     * @apiParam {String} password Password of the user to create
     * @apiParam {String} email Email of the user to create
     * @apiParam {String} phoneNumber phoneNumber of the user to create
     * @apiParam {String} country Country of the user to create
     *
     * @apiSuccess {Boolean} success True if successful
     * @apiSuccess {String} message User Successfully Created
     *
     * @apiError UserNameUnavailable message UserName Already in Use
     */
    app.post('/api/user', function(req, res) {
        jwt.createUser(db, req.body.username, req.body.password, req, function(response){
            res.json(response);
        })
    });
	
	/**
     * @api {post} /profile
     * @apiName PostUser
     * @apiGroup User
     * @apiDescription Creates User
     *
     * @apiParam {String} username Username of the user to update
     * @apiParam {String} password Password of the user
     * @apiSuccess {Boolean} success True if successful
     * @apiSuccess {String} message User Successfully Created
     *
     */
	app.post('/api/profile', function(req, res){
		jwt.editProfile(db, req.body.username, req.body.password, req, function(response){
			res.json(response);
		})
	});

    /**
     * @api {post} /login
     * @apiName PostLogin
     * @apiGroup User
     * @apiDescription Gives a valid Token if Login successful
     *
     * @apiParam {String} username the username of the user to login
     * @apiParam {String} password the password of the user to login
     *
     * @apiSuccess {Boolean} success True if successful
     * @apiSuccess {String} message Successfully Logged In
     * @apiSuccess {Object} user UserProfile Information
     * @apiSuccess {String} user.UserName The Username of the User
     * @apiSuccess {String} user.Email The email address of the User
     * @apiSuccess {String} user.Country The country of the User
     * @apiSuccess {String} user.PhoneNum The Phone Number of the User
     * @apiSuccess {number} user.TimeStamp The timestamp of user creation
     * @apiSuccess {string} token The login token of the user
     *
     * @apiError invalidPassword The Password is incorrect
     * @apiError invalidUsername The UserName does not exist
     * @apiError incompleteForm The UserName/Password was not provided
     */
    app.post('/api/login', function(req,res) {
        jwt.authenticate(db, req.body.username, req.body.password, function(response) {

            res.json(response);
        })
    });

    /**
     * @api {get} /user
     * @apiName GetUser
     * @apiGroup User
     * @apiDescription Returns back data about the user
     *
     * @apiSuccess {Boolean} success True if successful
     * @apiSuccess {Object} user UserProfile Information
     * @apiSuccess {String} user.UserName The Username of the User
     * @apiSuccess {String} user.Email The email address of the User
     * @apiSuccess {String} user.Country The country of the User
     * @apiSuccess {String} user.PhoneNum The Phone Number of the User
     * @apiSuccess {number} user.TimeStamp The timestamp of user creation
     * @apiSuccess {string} token The login token of the user
     *
     * @apiError tokenInvalid Token is Invalid
     * @apiError tokenNotProvided Token is required
     */
    app.get('/api/user', isLoggedIn, function(req,res){
        //shows any authentication errors that come with login and signup
        user.getUser(db,req.user, function(results){
            res.json({success: true, user:results})
        })
    });
    
    app.get('/api/aUser',isLoggedIn, function(req,res){
        console.log('un: '+req.query.username)
        user.findUser(db,req.query.username, function(results){
            res.json({success: true, user:results})
        })
    })
	
}
