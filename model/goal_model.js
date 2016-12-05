userM = require('../model/user_model')
/*
  methods and functions for accessing and manipulating database
  for goals entity
*/
var GoalModel = function(){

};

/*
  [CREATE_GOAL]
  create a goal and then connect it into the user that
  made the goal
*/
GoalModel.prototype.createGoal = function(db, userName, goalTitle,
										  description, finishInDay,callback){
    console.log("creating goal");
		console.log(userName);
		console.log(goalTitle);
		console.log(description);
		console.log(finishInDay);

    db.cypher({

		query: 'MATCH (u:User{UserName:{uName}}) ' +
			     'CREATE (g:Goal{Title: {gTitle}, '  +
           'Description: {desc},TimeCreated:{timeStamp},' +
           'FinishInDay:{finInDay}, Status:{status}}) ' +
           'CREATE UNIQUE (u)-[:SET_GOAL]->(g)',
		params: {
			uName       : userName,
			gTitle      : goalTitle,
			desc        : description,
			finInDay    : finishInDay,
		  status      : "Unfinished",
			timeStamp   : Date.now()
		}

	}, function(err, results){
      if(err) throw err;
  		callback(results? true : false);
	})
};


/*
  [GET_ALL_GOALS]
  get all goals set by user
*/
GoalModel.prototype.getAllGoals = function(db, userName, callback){
    db.cypher({

		query: 'Match (u:User {UserName:{uName}}), (u)-[:SET_GOAL]->(g:Goal) RETURN (g) ORDER BY g.TimeCreated DESC',
		params: {
			uName : userName
		}

	}, function(err, results){
      if(err) throw err;
			callback(results[0]? results[0].g.properties : false);
	})
};


/*
  [DELETE_GOAL]
  delete a goal set by a certain user
*/
GoalModel.prototype.deleteGoal = function(db, userName, goalTitle, callback){
    db.cypher({

		query: 'MATCH (u:USER{UserName:{uName}}), (g:Goal{Title: {gTitle}}) ' +
			     'DETACH DELETE (g)',
		params: {
			uName       : userName,
			gTitle      : goalTitle
		}

	}, function(err, results){
      if(err) throw err;
  		callback(results[0]? true : false);
	})
};

GoalModel.prototype.saveChanges = function(db, userName,pic,email,password,gender,aboutMe,activity,number,days,callback){
    console.log("creating goal");
		console.log(userName);
		console.log(pic);
		console.log(email);
		console.log(password);
		console.log(gender);
		console.log(aboutMe);
		console.log(activity);
		console.log(number);
		console.log(days);
		if(days=='Weeks'){
			number *= 7;
		}
		if(days=='Months'){
			number *= 30;
		}
		console.log(number + ' days');
		password = userM.generateHash(password);
		console.log('password is '+password);
    db.cypher({

		query: 'MATCH (u:User{UserName:{uName}})' +
				'SET u.pic={pic} '  +
				'SET u.Email={email} '  +
				'SET u.Password={password} '  +
				'SET u.Gender={gender} '  +
				'SET u.AboutMe={aboutMe} '  +
			     'CREATE (g:Goal{Title: {gTitle}, '  +
           'TimeCreated:{timeStamp},' +
           'FinishInDay:{finInDay}, Status:{status}}) ' +
           'CREATE UNIQUE (u)-[:SET_GOAL]->(g)',
		params: {
			uName       : userName,
			pic : pic,
			email : email,
			password : password,
			gender : gender,
			aboutMe : aboutMe,
			gTitle      : activity,
			finInDay    : number,
		  status      : "Unfinished",
			timeStamp   : Date.now()
		}

	}, function(err, results){
      if(err) throw err;
  		callback(results? true : false);
	})
};


module.exports = new GoalModel();
