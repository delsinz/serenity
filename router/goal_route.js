var goal = require('../model/goal_model.js')

module.exports = function(app, db, isLoggedIn) {
	//creates a goal
	app.post('/api/goal/setGoal', isLoggedIn, function(req, res) {
		goal.createGoal(db, req.user.UserName, req.body.goalTitle, req.body.descr,
                       req.body.finishInDay,function(result){
            if (result) {
                res.json({success:true, message:"goal created"})
            } else {
                res.json({success:false, message:"Unable to create goal"})
            }
		});
    });

	// get all goals
	app.get('/api/goal/allGoals', isLoggedIn, function(req, res) {
		goal.getAllGoals(db,req.user.UserName,function(result){
            if (result) {
                res.json({success:true, message:result})
            } else {
                res.json({success:false, message:"Unable to find goals"})
            }
		});
    });

  //delete post
	app.delete('/api/goal', isLoggedIn, function(req, res) {
		goal.deleteGoal(db, req.user.UserName, req.body.goalTitle,function(result){
            if (result) {
                res.json({success:true, message:"deleted a goal"})
            } else {
                res.json({success:false, message:"Unable to delete"})
            }
		});
    });
	
	app.post('/api/saveChanges', isLoggedIn, function(req, res) {
		goal.saveChanges(db, req.user.UserName,req.body.pickapic,req.body.email,req.body.password,req.body.gender,req.body.aboutMe,req.body.activity,req.body.number,req.body.days,function(result){
            if (result) {
                res.redirect('/Profile');
            } else {
                res.json({success:false, message:"Unable to save"})
            }
		});
    });

}
