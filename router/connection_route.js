var connection = require('../model/connection_model')

module.exports = function(app, db, isLoggedIn) {
    /**
     * @api {post} /connection
     * @apiName PostConnection
     * @apiGroup Connection
     * @apiDescription Send a connection request to another user
     * 
     * @apiParam {String} destination The Username of the user to send request to
     * 
     * @apiSuccess {Boolean} success True if successful
     * @apiSuccess {String} message Connection request sent
     * 
     * @apiError UnableToConnect Unable to Connect
     * @apiError tokenInvalid Token is Invalid
     * @apiError tokenNotProvided Token is required
     */
    app.post('/api/connection', isLoggedIn, function(req, res) {
		connection.requestConnection(db,req.user.UserName,req.body.destination,function(result){
            if (result) {
                res.json({success:true, message:"Connection request sent"})
            } else {
                res.json({success:false, message:"Unable to make Connection"})
            }
		});
    });
	
    /**
     * @api {put} /connection
     * @apiName PutConnection
     * @apiGroup Connection
     * @apiDescription Accept a connection request from another UserName
     * 
     * @apiParam {String} destination The Username of the reqeust to acceptConnection
     * 
     * @apiSuccess {Boolean} success True if successful
     * @apiSuccess {String} message Connection made
     * 
     * @apiError tokenInvalid Token is Invalid
     * @apiError tokenNotProvided Token is required
     */
	app.put('/api/connection', isLoggedIn, function(req, res) {
		connection.acceptConnection(db,req.user.UserName,req.body.destination,function(result){
			res.json({success:true, message:"Connection made"})
		});
    });
    
	/**
     * api {delete} /connection
     * @apiName DeleteConnection
     * @apiGroup Connection
     * @apiDescription Deletes connection between user and another UserName
     * 
     * @apiParam {String} destination The Username with whome to delete connection
     * 
     * @apiSuccess {Boolean} success True if successful
     * @apiSuccess {String} message Connection deleted
     * 
     * @apiError tokenInvalid Token is Invalid
     * @apiError tokenNotProvided Token is required
     */
	app.delete('/api/connection', isLoggedIn, function(req, res) {
		connection.deleteConnection(db,req.user.UserName,req.body.destination,function(result){
			res.json({success:true, message:"Connection deleted"})
		});
    });
	//get all connections from the user
	app.get('/api/getAllConnection', isLoggedIn, function(req, res) {
		connection.getAllConn(db,req.user.UserName,function(result){
            if (result) {
                res.json({success:true, message:"Got the Users",connections: result})
            } else {
                res.json({success:false, message:"Unable to get"})
            }
		});
    });
    
    app.get('/api/getAllConnReqs', isLoggedIn, function(req,res){
        connection.getAllConnReq(db, req.user.UserName, function(result){
            if (result) {
                res.json({success:true, message:"Got Connection Requests", connections: result})
            } else {
                res.json({success:false, message:"Unable to get Connection Requests", connection: []})
            }
        })
    })
    app.post('/api/rejConn', isLoggedIn, function(req,res){
        connection.rejectConnection(db,req.user.UserName, req.body.destination,function(result){
            res.json({success:true, message:"Rejected Connection"})
        })
    })
}