var HashtagModel = function(){

};

/*
[CREATE_HASHTAG]
*/
HashtagModel.prototype.createHashtag = function(db, tag, callback){
	console.log("creating");
	db.cypher({

		query: 'MERGE (m:Hashtag{Tag:{tag}}) ' +
			   'RETURN m',
		params: {
			tag : tag
		}

	}, function(err, results){
		if(err) throw err;
		callback(results[0]? true : false);
	})
};

/*
  [FOLOW_HASTAG]
	for a given user with username, will create a
	connection to hashtag that have Tag *tag*
	NOTE it works but the callback said that it doesnt work
*/
HashtagModel.prototype.followHashtag = function(db, username, tag, callback){
	console.log("creating");
	db.cypher({
		query: 'MATCH (u:User {UserName: {username}}),' +
			     '(ht: Hashtag{Tag: {tag}})' +
			     'CREATE UNIQUE (u)-[:FOLLOW_TAG]->(ht);',
		params: {
			username : username,
			tag      : tag
		}

	}, function(err, results){
		if(err) throw err;
		callback(results[0]? true : false);
	})
};



/*
[FIND_HASHTAG]
*/
HashtagModel.prototype.findHashtag = function(db, tag, callback){
	console.log("finding");
	db.cypher({

		query: 'MATCH (m: Hashtag{Tag: {tag}}) RETURN (m)',
		params: {
			tag : tag
		}
	}, function(err, results) {
		if (err) throw err;
        callback(results[0]? true : false);
	})
};



/*
[GET_ALL_FOLLOWS]
*/
HashtagModel.prototype.getAllFollows = function(db, userName, callback){
	db.cypher({

		query: 'MATCH (u:User{UserName : {userName}})' +
			   '-[:FOLLOWS]-(h: Hashtag)' +
			   'RETURN (h)',

		params:  {
			userName: userName
		}
	}, function(err, results) {
		if (err) throw err;
        callback(results[0]? true : false);
	})
}


/*
 [TAG_POST]
 Tags the hashtag to the post. A post can have multiple hashtags in it
 and a hashtag tags one or more posts.
 */
 HashtagModel.prototype.tagPost = function(db, post_id, tag, callback){
 	// If hashtag doesn't exist create it
 	this.findHashtag(db, tag, function(results){
 		if (!results) {
 			HashtagModel.prototype.createHashtag(db, tag, function(r){
 				db.cypher({
 					query: 'MATCH (p:Post) WHERE ID(p)={post_id} ' +
 					'MATCH (h:Hashtag) WHERE h.Tag={tag} ' +
 					'CREATE UNIQUE (p)-[r:TAGGED_IN]->(h) return (r)',
 					params : {
 						post_id : post_id,
 						tag: tag,
 					}
 				}, function(err, result){
 					if(err) throw err;
 					console.log(result);
 					callback(result[0]?true:false);
 				})
 			});
 		}else{
 			db.cypher({
 				query: 'MATCH (p:Post) WHERE ID(p)={post_id} ' +
 				'MATCH (h:Hashtag) WHERE h.Tag={tag} ' +
 				'CREATE UNIQUE (p)-[r:TAGGED_IN]->(h) return (r)',
 				params : {
 					post_id : post_id,
 					tag: tag,
 				}
 			}, function(err, result){
 				if(err) throw err;
 				console.log(result);
 				callback(result[0]?true:false);
 			})
 		}
 	});
 };

/*
[FIND_POST]
*/
HashtagModel.prototype.findPost = function(db, tag, callback){
	db.cypher({
		query: 'MATCH (m:Post)-[:TAGGED_IN]->(:Hashtag{Tag:{tag}}) RETURN (m)',
		params: {
			tag : tag
		}
	}, function(err, results) {
		if (err) throw err;
		/*
		i = 0;
		while(results[i]){
			console.log(results[i].m.properties.Content);
			i++;
		}
		*/
        callback(results[0]? results : false);
	})
};


/*
	Will return the posts related to hashtag and
	the username responsible of posting that stuff
*/
HashtagModel.prototype.postReldHashTag = function(db, tag, callback){
	db.cypher({
		query: 'match (u:User)-[:POSTED]-(p:Post)-[]-(h:Hashtag{Tag:{tag}}) return u.UserName as from ,p',
		params: {
			tag : tag
		}
	}, function(err, results) {
		if (err) throw err;
		/*
		i = 0;
		while(results[i]){
			console.log(results[i].m.properties.Content);
			i++;
		}
		*/
        callback(results[0]? results : false);
	})
};

module.exports = new HashtagModel();
