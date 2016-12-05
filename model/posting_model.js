var PostingModel = function(){
    
};

/* 
[CREATE_POST]
currently the post have no 'likes'
*/
PostingModel.prototype.createPost = function(db, userName, content, link, visibility, callback){
	db.cypher({
		query: 'MATCH (this:User{UserName:{userName}})' +
		'CREATE (p:Post{Content:{content}, Link:{link}, Visibility:{visibility}, TimeStamp:{timeStamp}})' +
		'CREATE (this)-[:POSTED]->(p)' +
		'RETURN p',
		
		params: {
			userName   : userName,
			content    : content,
			link       : link,
			visibility : visibility,
			timeStamp  : Date.now()
		}

	}, function(err, results){
		if(err) throw err;
		var posts = results.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp:item.p.properties.TimeStamp, from:userName, privacy:item.p.properties.Visibility, isUser:true}})
		callback(posts);
	})
};


/*
[FIND_POST]
currently it has to match exactly a substring of the content,
need to work on speed as it's really slow right now
*/
PostingModel.prototype.findPost = function(db, postId, callback) {
	db.cypher({
		query: 'MATCH (p:Post) where id(p)={postId} RETURN p',
		params: {
			postId: postId
		}
	}, function(err, results) {
		if (err) throw err;
        callback(results[0]?results[0].p.properties:false);
	})
};


/*
[LIKE_POST]---->> MIGHT NEED FIX LATER
currently it is named 'like', other candidate is 'support'
match the exact content of the post, then link the user with 
the post
*/
PostingModel.prototype.likePost = function(db, userName, postId, callback){
	db.cypher({
		
		query: 'MATCH (u:User{UserName:{userName}}), (p:Post) where id(p)={postId}'+
		'CREATE UNIQUE (u)-[:LIKES]->(p)',
		params: {
			userName : userName,
			post 	 : post
		}

	}, function(err, results){
		if(err) throw err;
		callback(userName);
	})
}


/*
[DELETE_POST]---->> MIGHT NEED FIX LATER
currently it is matching the post with the exact same content,
then delete that post.
later we need to archive or implement the 'graveyard' system
(we won't call it graveyard)
*/
PostingModel.prototype.deletePost = function(db, postId, callback){
	db.cypher({

		query: 'MATCH (p:Post) WHERE id(p)={postId} DETACH DELETE p' ,
		params: {
			postId: postId
		}

	}, function(err, results){
		console.log(postId);
		if(err) throw err;
		callback(true);
	})
}
/*
gets all the post from a user
*/
PostingModel.prototype.getAllPost = function(db, userName,callback){
	db.cypher({
		
		query: 'MATCH (u:User{UserName:{userName}})'+
			    '-[:POSTED]->(p:Post)' +
			    'return p' ,
		params: {
			userName : userName,
		}

	}, function(err, results){
		if(err) throw err;
		callback(results);
	})
}

/*
shares post to a different user
 */
PostingModel.prototype.sharePost = function(db, postId, userName, otherUser, callback) {
	db.cypher({
		query:'MATCH (u:User {UserName:{userName}}) MATCH (other:User {UserName:{otherUser}}) MATCH (p:Post) where id(p)={postId} ' +
		      'CREATE UNIQUE (p)-[:SHARED_BY {to: other.UserName}]->(u) CREATE UNIQUE (p)-[:SHARED_TO {from: u.UserName}]->(other) return p',
		params: {
			userName:userName,
			otherUser:otherUser,
			postId: postId
		}
	}, function(err,results) {
		if (err) throw err;
        callback(results)
	})
}

/*

*/
PostingModel.prototype.getFeed = function(db, userName, timeStamp, callback) {
    db.cypher({
        query: 'MATCH (u:User {UserName:{userName}}) MATCH (u)-[CONNECTS]-(f)'+
               ' MATCH (f)-[pst:POSTED]-(p:Post) WHERE p.TimeStamp<{timeStamp}AND p.Visibility<>"myself"'+
               ' return p, f ORDER BY p.TimeStamp DESC LIMIT 20',
        params: {
            userName: userName,
            timeStamp: timeStamp
        }
    }, function(err,results) {
		if (err) throw err;
		db.cypher({
			query: 'MATCH (u:User {UserName:{userName}}) MATCH (p:Post)-[:SHARED_BY {to:u.UserName}]-(x)'+
				' MATCH (f)-[:POSTED]-(p) MATCH (p)-[:SHARED_TO {from:x.UserName}]-(u) WHERE p.TimeStamp<{timeStamp}' +
				 'return p, x, f ORDER BY p.TimeStamp DESC LIMIT 20',
			params: {
				userName: userName,
				timeStamp: timeStamp
			}
		}, function(err,results2) {
			if (err) throw err;
			db.cypher({
				query: 'MATCH (u:User{UserName:{userName}})'+
						'-[:POSTED]->(p:Post)' +
						'return p,u ORDER BY p.TimeStamp DESC LIMIT 20' ,
				params: {
					userName : userName,
				}

			}, function(err, results3){
				if(err) throw err;
				var a = results2.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp:item.p.properties.TimeStamp, from:item.f.properties.UserName, sharedBy:item.x.properties.UserName, privacy:item.p.properties.Visibility}})
				var b = results.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp:item.p.properties.TimeStamp, from:item.f.properties.UserName, privacy:item.p.properties.Visibility}})
				var c = results3.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp: item.p.properties.TimeStamp, from:userName, isUser:true, privacy:item.p.properties.Visibility}})
				var d = a.concat(b).concat(c)
				callback(unique(d.sort(compare)))
			})
		})
	})
}


PostingModel.prototype.getUserPosts = function(db, userName, otherUser, callback) {
	
	if (userName===otherUser){
		db.cypher({
			
			query: 'MATCH (u:User{UserName:{userName}})'+
					'-[:POSTED]->(p:Post)' +
					'return p,u ORDER BY p.TimeStamp DESC' ,
			params: {
				userName : userName,
			}

		}, function(err, results){
			if(err) throw err;
			var posts = results.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp:item.p.properties.TimeStamp, from:item.u.properties.UserName, privacy:item.p.properties.Visibility, isUser:true}})
			callback({isConnected:true, posts: posts})
		})
	} else {
		db.cypher({
			query: 'MATCH (u:User {UserName:{userName}}), '+
				'(u2:User {UserName:{otherUser}}), '+
				'(u)-[conn:CONNECTS]-(u2) RETURN conn',
			params: {
				userName:userName,
				otherUser: otherUser
			}
		}, function(err, results){
			if (err) throw err;
			if(results[0]){
				db.cypher({
					query: 'MATCH (u:User {UserName:{userName}}), '+
						'(u)-[:POSTED]-(p) WHERE p.Visibility<>"myself"'+
						' RETURN p,u ORDER BY p.TimeStamp DESC',
					params: {
						userName:otherUser
					}
				}, function(err, results){
					if (err) throw err;
					var posts = results.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp:item.p.properties.TimeStamp, from:item.u.properties.UserName, privacy:item.p.properties.Visibility}})
					callback({isConnected:true, posts: posts})
				})
			} else {
				db.cypher({
					query: 'MATCH (u:User {UserName:{userName}}), '+
						'(u)-[:POSTED]-(p) WHERE p.Visibility="public"'+
						' RETURN p,u ORDER BY p.TimeStamp DESC',
					params: {
						userName:otherUser
					}
				}, function(err, results){
					if (err) throw err;
					var posts = results.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp:item.p.properties.TimeStamp, from:item.u.properties.UserName, privacy:item.p.properties.Visibility}})
					callback({isConnected:false, posts: posts})
				})
			}
		})
	}
}

/*
[GET_TRENDING]
Gets the hashtags that have been tagged by the most posts in the last 24*3600*1000
hours.
*/
PostingModel.prototype.getTrending = function(db, callback) {
	var oneDay = 24*3600*1000;
	var timeStamp = Date.now()
	console.log(timeStamp);
	db.cypher({
        query: 'MATCH (p:Post)-[:TAGGED_IN]-(h)'+
               'WHERE p.TimeStamp<{timeStamp} AND ' +
			   'p.TimeStamp > ({timeStamp} - {oneDay}) AND ' +
			   'p.Visibility="public"'+
               'return h.Tag, count(p) ORDER BY count(p) DESC LIMIT 25',
        params: {
            timeStamp: timeStamp,
			oneDay   : oneDay
        }
	},	function(err,results) {
		if (err) throw err;
        callback(results)
	})
}


module.exports = new PostingModel();

function compare(a,b) {
  if (a.timeStamp > b.timeStamp)
    return -1;
  else if (a.timeStamp < b.timeStamp)
    return 1;
  else 
    return 0;
}

function unique(arr) {
	for (var i=0; i<arr.length-1;i++){
		if (arr[i].id===arr[i+1].id){
			arr.splice(i,1)
		}
	}
	return arr;
}
