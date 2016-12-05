var ModerationModel = function(){
    
};
//get all the unresolved report.
ModerationModel.prototype.getUnresolved = function(db, callback){
	console.log("getting unesolved report");
	db.cypher({
		query: 'MATCH (hub: ModerationHub)'+
			   'MATCH (p:Post)-[:UNRESOLVED]->(hub) '+
               'RETURN p',
		params: {
			type : 'moderator'
		}

	}, function(err, results){
		if(err) throw err;
		console.log(results);
		callback(results);
	})
};
//get poster
ModerationModel.prototype.getPoster = function(db,postId,callback){
	console.log("getting poster");
	db.cypher({
		////'MATCH (u:User {UserName: {userName},UserType:{type}})'+
		query: 'MATCH (u:User)-[:POSTED]->(p:Post) where id(p) ={postId} '+
               'RETURN u',
		params: {
			postId : parseInt(postId)
		}

	}, function(err, results){
		if(err) throw err;
		console.log('user = '+results);
		callback(results);
	})
};

//get all the resolved report.
ModerationModel.prototype.getResolved = function(db, callback){
	console.log("getting resolved report");
	db.cypher({
		query: //'MATCH (u:User {UserName: {userName},UserType:{type}})'+
			   'MATCH (hub: ModerationHub)'+
			   'MATCH (p:Post)-[:RESOLVED]->(hub) '+
               'RETURN p',
		params: {
			type : 'moderator'
		}

	}, function(err, results){
		if(err) throw err;
		console.log(results);
		callback(results);
	})
};

/*
report a post. Creates three new relationships: An explanation of why the post
was reported, the user who reported the post, and a relationship indicating that
the report hasn't been reviewed yet.
*/

ModerationModel.prototype.createReport = function(db, userName, reason, postId, callback){
	db.cypher({
		query: 'MATCH (p:Post) where id(p)={postId}' +
			   'MATCH (u:User {UserName: {userName}})'+
			   'MATCH (hub: ModerationHub)'+
			   ' CREATE (r:report{reason:{reason}, timeStamp: {timeStamp}})'+
			   ' CREATE UNIQUE (r)-[ra:REPORT_ABOUT]->(p) '+
			   ' CREATE UNIQUE (u)-[rf:REPORT_FROM]->(r) '+
			   ' CREATE UNIQUE (p)-[rt:UNRESOLVED]->(hub) '+
               "RETURN p",
		params: {
			userName : userName,
			postId   : parseInt(postId),
			timeStamp: Date.now(),
			reason  : reason
		}

	}, function(err, results){
		if(err) throw err;
		console.log(results);
		callback(results[0]? true : false);
	})
};

/*
Resolves a previously reported post, inidcating more details about the review
(why was it or wasn't it deleted) and who reviewed the report. Also deletes the
unresolved relationship.
*/
ModerationModel.prototype.resolveReport = function(db, postId, review, modName, callback) {
	console.log(postId);
	console.log(review);
	console.log(modName);
	db.cypher({
		query: 'MATCH (p:Post) where id(p)={postId} ' +
			   'MATCH (m:User {UserName: {modName}}) '+
			   'MATCH (hub: ModerationHub) '+
			   ' MATCH (p)-[rt:UNRESOLVED]->(hub)'+
			   ' DELETE (rt)'+
			   ' CREATE (rev:review{review:{review}, timeStamp: {timeStamp}})'+
			   ' CREATE UNIQUE (m)-[rf:REVIEW_FROM]->(rev) '+
			   ' CREATE UNIQUE (rev)-[ra:REVIEW_ABOUT]->(p) '+
			   ' CREATE UNIQUE (p)-[rtn:RESOLVED]->(hub) '+
               "RETURN p",
		params: {
			modName : modName,
			postId   : parseInt(postId),
			timeStamp: Date.now(),
			review  : review
		}

	}, function(err, results){
		if(err) throw err;
		callback(results)
		
	})
}

/*
Makes a moderator out of a regular user
*/
ModerationModel.prototype.makeModerator = function(db, userName, callback) {
	db.cypher({
		query: 'MATCH (u:User {UserName:{userName}}) SET u.UserType={userType}',
		params: {
			userName:userName,
			userType: 'moderator'
		}
	}, function(err, results){
		if(err) throw err;
		callback(results)
	})
}

module.exports = new ModerationModel();