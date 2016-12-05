
var neo4j = require ('neo4j');
var db = new neo4j.GraphDatabase("http://neo4j:INFO30005@188.166.245.190:80");

postId = 133;
otherUser = 'a';
userName = 'asdf';
review = "Shit"
reason = "I dont like you trlolololo"
timeStamp = Date.now()
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
		console.log(results[0]?true:false)
		if(results[0]){
			db.cypher({
				query: 'MATCH (u:User {UserName:{userName}}), '+
					'(u)-[:POSTED]-(p) WHERE p.Visibility<>"myself" RETURN p,u',
				params: {
					userName:otherUser
				}
			}, function(err, results){
				if (err) throw err;
				console.log("I am here")
				var b = results.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp:item.p.properties.TimeStamp, from:item.u.properties.UserName, privacy:item.p.properties.Visibility}})
				console.log(b)
			})
		} else {
			db.cypher({
				query: 'MATCH (u:User {UserName:{userName}}), '+
					'(u)-[:POSTED]-(p) WHERE p.Visibility="public" RETURN p,u',
				params: {
					userName:otherUser
				}
			}, function(err, results){
				if (err) throw err;
				var b = results.map(function(item){return {id:item.p._id, content:item.p.properties.Content, timeStamp:item.p.properties.TimeStamp, from:item.u.properties.UserName, privacy:item.p.properties.Visibility}})
				console.log(b)
			})
		}
	})