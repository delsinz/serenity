var bcrypt = require('bcrypt-nodejs');
var verification = require('./verification_model');

var UserModel = function(){
}

/* last update: Thu 31 March 2016
 *
 *
 * Some functions related to interactions with database (Neo4J)
 * currently these are the functions here: 
 * find with texteditor using these detail
 * 		[CREATE_USER]
 *		[FIND_USER]
 *		[RENAME_USER]
 *		[UPDATE_USER]
 * 		[CHANGE_COUNTRY]
 * 		[REQUEST_CONNECT]
 * 		[ACCEPT_CONNECT]
 * 		[DELETE_CONNECTION]
 *      [CREATE_POST]
 *		[DELETE_POST]
 *		[LIKE_POST]
 * 		[FIND_POST]
 *		[LIKE_POST]
 *		[CREATE_HASHTAG]
 *		[TAG_POST]
 */



/*********************************** USER *************************************/

/*
[CREATE_USER]
*/
UserModel.prototype.createUser = function(db, userName, password, 
										  email, phoneNum, gender, callback){
    db.cypher({
		
		query: 'CREATE (m:User {UserName: {userName}, Password:{password},'+
			   ' Email:{email}, PhoneNum:{phoneNum}, Gender:{gender},' +
			   ' AboutMe:{aboutMe}, UserType:{userType},' +
			   ' TimeStamp: {timeStamp}, isVerifiedPhone: {isVerifiedPhone},'+
               ' isVerifiedEmail: {isVerifiedEmail}, ConnectionPrivacy:{connPrivacy}, ' +
			   ' MessagePrivacy: {msgPrivacy}, pic: {pic}}) RETURN m',
		params: {
			userName : userName,
			password : password,
			email    : email,
			phoneNum : phoneNum,
			gender   : gender,
			aboutMe  : "",
			userType : "user",
			timeStamp: Date.now(),
            isVerifiedPhone: false,
            isVerifiedEmail: false,
			connPrivacy    : "everyone",
			msgPrivacy     : "everyone",
			pic: 0
		}

	}, function(err, results){
		if(err) throw err;
		verification.createVerification(db, results[0].m, function(verification){
            callback(results[0]? results[0].m.properties : null);
        })
	})
};


/* 
[RENAME_USER] Not in use
*/
UserModel.prototype.reName = function(db, User, userName) {
	this.findUser(db, User, function(results){
		if (!results) {
			console.log("ERROR: User Not Found")
		}
		else {
			db.cypher({
				query: 'MATCH (m:User) WHERE ID(m)={id} SET m.UserName={userName}',
				params : {
					id: results._id,
					userName: userName
				}
			}, function(err, result){
				if(err) throw err;
			})
		}
	});
};


/*
[FIND_USER]
find the user based on the username
*/
UserModel.prototype.findUser = function(db, User, callback) {
    console.log(User)
	db.cypher({
		query: 'MATCH (m:User {UserName:{b}}) RETURN m',
		params: {
			b: User
		}
	}, function(err, results) {
		if (err) throw err;
        callback(results[0]? results[0].m.properties : null);
	})
};
UserModel.prototype.getUser = function(db, User, callback) {
	db.cypher({
		query: 'MATCH (m:User {UserName:{b}}) RETURN m',
		params: {
			b: User.UserName
		}
	}, function(err, results) {
		if (err) throw err;
        callback(results[0]? results[0].m.properties : null);
	})
};


/* 
[UPDATE_USER]
Updates user details; Allows to change username, password, email,
phone number, details about user and privacy settings
 */
UserModel.prototype.updateUser = function(db, userName, password, email, 
										  phoneNum, gender, aboutMe, userType, 
										  connPrivacy, msgPrivacy, profPrivacy,
										  pic, callback) {
	db.cypher({
		query: 'MATCH (m:User {UserName: {userName}}) ' +
		'SET m.Password={password}, m.Email={email}, m.PhoneNum={phoneNum}, ' + 
		'm.Gender={gender}, m.AboutMe={aboutMe}, m.UserType={userType}, '+
		'm.ConnectionPrivacy ={connPrivacy}, m.MessagePrivacy ={msgPrivacy}, ' +
		'm.ProfilePic = {pic} RETURN m',
		params : {
			userName: userName,
			email   : email,
			password: password,
			phoneNum: phoneNum,
			gender  : gender,
			aboutMe	: "",
			userType: userType,
			connPrivacy : connPrivacy,
			msgPrivacy  : msgPrivacy,
			profPrivacy : profPrivacy,
			pic     : pic
		}
	}, function(err, results){
		if(err) throw err;
		callback(results[0]? results[0].m.properties : null);
	})
};


/*
[REQUEST_CONNECT]
*/
UserModel.prototype.requestConnect = function(db, userName, otherUser){
	db.cypher({
		query: 'MATCH (this:User {UserName: {userName}}),' +
			   '(other: User{UserName: {otherUser}})' +
			   ' CREATE (this)-[:REQUEST_CONNECTION]->(other)',
		params: {
			userName   : userName,
			otherUser  : otherUser
		}

	}, function(err, results){
		if(err) throw err;
		
	})
};


/* 
[ACCEPT_CONNECT]
*/
UserModel.prototype.acceptConnect = function(db, userName, otherUser){
	db.cypher({
		query: 'MATCH (this:User {UserName: {userName})' +
			   '-[rel:REQUEST_CONNECTION]->' +
			   '(other: User{UserName: {otherUser}}) ' +
			   'CREATE (this)-[c:CONNECTS{date_created:{timeStamp}}]->(other)' +
			   'DELETE rel',
		params: {
			userName   : userName,
			otherUser  : otherUser,
			timeStamp  : Date.now()
		}

	}, function(err, results){
		if(err) throw err;
		
	})
};


/*
[DELETE_CONNECTION]
*/
UserModel.prototype.delConnect = function(db, userName, otherUser){
	db.cypher({
		query: 'MATCH (this:User{UserName:{userName}})'+
		'-[rel:CONNECTS]->' + 
		'(other:User{UserName:{otherUser}})' +
		'DELETE rel',
		params: {
			userName : userName,
			otherUser: otherUser
		}

	}, function(err, results){
		if(err) throw err;
		callback(results[0]? results[0].m.properties : null);
	})
};



/********************************** POST *************************************/

/* 
[CREATE_POST]
currently the post have no 'likes'
*/
UserModel.prototype.createPost = function(db, userName, content, link, visibility){
	db.cypher({
		
		query: 'MATCH (this:User{UserName:{userName}})' +
		'CREATE (p:Post{Content:{content}, Link:{link}, Visibility:{visibility}})' +
		'CREATE (this)-[:POSTED{time_posted:timeStamp}]->(p)',
		params: {
			userName   : userName,
			content    : content,
			link       : link,
			visibility : visibility,
			timeStamp  : Date.now()
		}

	}, function(err, results){
		if(err) throw err;
	})
};


/*
[FIND_POST]
currently it has to match exactly a substring of the content,
need to work on speed as it's really slow right now
*/
UserModel.prototype.findPost = function(db, subtring, callback) {
	db.cypher({
		query: 'MATCH (m:Post WHERE Content=~ {substring}) RETURN m',
		params: {
			substring: ".*" + substring + ".*"
		}
	}, function(err, results) {
		if (err) throw err;
        callback(results[0]? results[0].m.properties : null);
	})
};


/*
[LIKE_POST]---->> MIGHT NEED FIX LATER
currently it is named 'like', other candidate is 'support'
match the exact content of the post, then link the user with 
the post
*/
UserModel.prototype.likePost = function(db, post, userName){
	db.cypher({
		
		query: 'MATCH (u:User{UserName:{userName}}), (p:Post{Content:{post}})'+
		'CREATE (u)-[:LIKES]->(p)' ,
		params: {
			userName : userName,
			post 	 : post
		}

	}, function(err, results){
		if(err) throw err;
	})
}


/*
[DELETE_POST]---->> MIGHT NEED FIX LATER
currently it is matching the post with the rxact same content,
then delete that post.
later we need to archive or implement the 'graveyard' system
*/
UserModel.prototype.deletePost = function(db, post){
	db.cypher({
		
		query: 'MATCH (p:Post{Content:{post}}) DELETE p' ,
		params: {
			post 	 : post
		}

	}, function(err, results){
		if(err) throw err;
	})
}


/***************************** HASHTAG *******************************/

/*
[CREATE_HASHTAG]
*/
UserModel.prototype.createHashtag = function(db, tag, callback){
	db.cypher({
		
		query: 'CREATE (m: Hashtag{Tag:{tag}})',
		params: {
			tag : tag
		}

	}, function(err, results){
		if(err) throw err;
		callback(results[0]? results[0].m.properties : null);
	})
};


/* 
[FIND_HASHTAG]
*/
UserModel.prototype.findHashtag = function(db, tag, callback){
	db.cypher({
		
		query: 'MATCH (m: Hashtag{Tag: {tag}}) RETURN m',
		params: {
			tag : tag
		}
	}, function(err, results) {
		if (err) throw err;
        callback(results[0]? results[0].m.properties : null);
	})
};


/*
[TAG_POST]
*/
UserModel.prototype.tagPost = function(db, post_id, tag, callback){
	// If hashtag doesn't exist create it
	this.findHashtag(db, tag, function(results){
		if (!results) {
			createHashtag(db, tag, function(results){});
		}
		else {
			db.cypher({
				query: 'MATCH (p:Post) WHERE ID(p)={post_id},' +
				'MATCH (h:Hashtag) WHERE ID(p)={tag_id},' +
				'CREATE (p)-[TAGGED_IN]->(h)',
				params : {
					post_id : post_id,
					tag_id: results._id,
					userName: userName
				}
			}, function(err, result){
				if(err) throw err;
			})
		}
	});
};


/*
gets all the post from a user
*/
UserModel.prototype.getAllPost = function(db, userName){
	db.cypher({
		
		query: 'MATCH (u:User{UserName:{userName}})'+
			    '-[:POSTED]->(p:Post)' +
			    'return p' ,
		params: {
			userName : userName,
		}

	}, function(err, results){
		if(err) throw err;
	})
}


/*
gets all the connections from the user
*/
UserModel.prototype.getAllConn = function(db, userName){
	db.cypher({
		
		query: 'MATCH (u:User{UserName:{userName}})'+
			    '-[:CONNECTS]->(other:User)' +
			    'return other' ,
		params: {
			userName : userName,
		}

	}, function(err, results){
		if(err) throw err;
	})
}



UserModel.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserModel.prototype.validPassword = function(Upassword, Gpassword) {
    return bcrypt.compareSync(Gpassword, Upassword);
};

module.exports = new UserModel();
