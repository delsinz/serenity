var hashtag = require('../model/hashtag_model')

module.exports = function(app, db, isLoggedIn) {
	//tag post
	app.put('/api/hashtag', isLoggedIn, function(req, res) {
		hashtag.tagPost(db,parseInt(req.body.id),req.body.tag,function(result){
            if (result) {
                res.json({success:true, message:"taged"})
            } else {
                res.json({success:false, message:"Unable to tag"})
            }
		});
    });
	// find post given the hastag
	app.get('/api/hashtag/allPost', isLoggedIn, function(req, res) {
		hashtag.findPost(db,req.query.tag,function(result){
            if (result) {
                res.json({success:true, message:result})
            } else {
                res.json({success:false, message:"Unable to find post related to hashtag"})
            }
		});
    });

	/* find hashtag, not the post
	*/
	app.get('/api/hashtag', isLoggedIn, function(req, res){
		hashtag.findHashtag(db,req.query.tag,function(result){
            if (result) {
                res.json({success:true, message:result})
            } else {
                res.json({success:false, message:"Unable to find hashtag"})
							}
		});
  	});

	/*
	will get post related to hashtag and the username
	for each post
	*/
	app.get('/api/hashtag/psRelHt', isLoggedIn, function(req, res){
		hashtag.postReldHashTag(db,req.query.tag,function(result){
            if (result) {
                res.json({success:true, message:result})
            } else {
                res.json({success:false, message:"Unable to find hashtag"})
							}
		});
  	});

	/*
		following hashtag
		NOTE following hashtag work but the result said that it is not working
	*/
	app.put('/api/followHashtag', isLoggedIn, function(req, res){
		hashtag.followHashtag(db,req.query.username,req.query.tag,function(result){
            if (result) {
                res.json({success:true, message:result})
            } else {
                res.json({success:false, message:"Unable to find hashtag"})
							}
		});
  	});

}
