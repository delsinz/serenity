var posting = require('../model/posting_model')

module.exports = function(app, db, isLoggedIn) {
	//post
    app.post('/api/posting', isLoggedIn, function(req, res) {
		posting.createPost(db,req.user.UserName,req.body.content,req.body.link,req.body.visibility,function(result){
            if (result) {
                res.json({success:true, message:"posted", posts:result, id:result[0].id})
            } else {
                res.json({success:false, message:"Unable to post"})
            }
		});
    });
	//find post
	app.get('/api/posting', isLoggedIn, function(req, res) {
		posting.findPost(db,req.query.content,function(result){
            if (result) {
                res.json({success:true, message:result})
            } else {
                res.json({success:false, message:"Unable to found"})
            }
		});
    });
	//like post
	app.put('/api/posting', isLoggedIn, function(req, res) {
		posting.likePost(db,req.user.UserName,req.body.content,function(result){
            if (result) {
                res.json({success:true, message:"liked"})
            } else {
                res.json({success:false, message:"Unable to like"})
            }
		});
    });
	//delete post
	app.delete('/api/posting', isLoggedIn, function(req, res) {
		posting.deletePost(db, parseInt(req.body.postId),function(result){
            if (result) {
                res.json({success:true, message:"deleted"})
            } else {
                res.json({success:false, message:"Unable to delete"})
            }
		});
    });
	//get all post from the user
	app.get('/api/getAllPost', isLoggedIn, function(req, res) {
		posting.getAllPost(db,req.user.UserName,function(result){
            if (result) {
                res.json({success:true, message:result})
            } else {
                res.json({success:false, message:"Unable to get"})
            }
		});
    });
    
    app.get('/api/userPosts', isLoggedIn, function(req, res){
        posting.getUserPosts(db, req.user.UserName, req.query.otherUser,function(result){
            res.json({success:true, message:'Got Posts', posts:result})
        })
    })
    app.get('/api/feed', isLoggedIn, function(req,res){
        posting.getFeed(db,req.user.UserName, parseInt(req.query.timeStamp),function(result) {
            if (result) {
                res.json({success:true, message:"Got Feed", posts:result})
            }
        })
    })
    app.post('/api/share', isLoggedIn, function(req, res){
        posting.sharePost(db, parseInt(req.body.id), req.user.UserName, req.body.OtherUser, function(result){
            res.json({success:true, message:"Successfully Shared to "+req.body.OtherUser})
        })
    })
    app.get('/api/trending', isLoggedIn,function(req,res) {
        posting.getTrending(db, function(result){
            console.log(result)
            res.json({success:true, message: 'retrieved trending', result:result})
        })
    })
}