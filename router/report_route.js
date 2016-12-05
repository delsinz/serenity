
var report = require('../model/moderation_model')

module.exports = function(app, db, isLoggedIn) {
	app.get('/moderator',isLoggedIn, isModerator,function(req,res){
		res.render('../public/moderator/moderator.ejs');
	});
	
    //creates Report
    app.post('/api/report', isLoggedIn, function(req, res) {
		report.createReport(db,req.user.UserName,req.body.reason,req.body.id,function(result){
            if (result) {
                res.json({success:true, message:"reported"})
            } else {
                res.json({success:false, message:"Unable to report"})
            }
		});
    });
	
	app.post('/api/resolve', isLoggedIn, function(req, res) {
		report.resolveReport(db,req.body.id,'approved',req.user.UserName,function(result){
            if (result) {
                res.json({success:true, message:"approved"});
            } else {
                res.json({success:false, message:"Unable to approve"});
            }
		});
    });
	
	app.post('/api/resolveBan', isLoggedIn, function(req, res) {
		report.resolveReport(db,req.body.id,'ban',req.user.UserName,function(result){
            if (result) {
                res.json({success:true, message:"banned"});
            } else {
                res.json({success:false, message:"Unable to ban"});
            }
		});
    });
	
	//get poster
	app.get('/api/getPoster', isLoggedIn, function(req, res) {
		report.getPoster(db,req.query.postId,function(result){
            if (result) {
                res.json(result);
            } else {
                res.json({success:false, message:"Unable to get unresolved"})
            }
		});
    });
	//get unresolved reports
	app.get('/api/unresolved', isLoggedIn, function(req, res) {
		report.getUnresolved(db,function(result){
            if (result) {
                res.json(result);
            } else {
                res.json({success:false, message:"Unable to get unresolved"})
            }
		});
    });
	//get resolved reports
	app.get('/api/resolved', isLoggedIn, function(req, res) {
		report.getResolved(db,function(result){
            if (result) {
                res.json(result);
            } else {
                res.json({success:false, message:"Unable to get resolved"})
            }
		});
    });
}

var isModerator = function(req,res,next) {
    if(req.user.UserType==='moderator'){
        next();
    } else {
        res.redirect('/profile')
    }
}