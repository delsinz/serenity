var ConnectionModel = function(){
    
};

/*
[REQUEST_CONNECT]
*/
ConnectionModel.prototype.requestConnection = function(db, userName, otherUser, callback){
	db.cypher({
		
		query: 'MATCH (u:User{UserName:{userName}}),'+
			    '(other:User{UserName:{otherUser}})-[r:REJECT_CONNECTION]->(u)' +
			    'return r' ,
		params: {
			userName : userName,
			otherUser: otherUser
		}

	}, function(err, results){
		if(err) throw err;
		if (!results[0]){
			db.cypher({
				query: 'MATCH (this:User {UserName: {userName}}),' +
					'(other: User{UserName: {otherUser}})' +
					' CREATE UNIQUE (this)-[c:REQUEST_CONNECTION]->(other)'+
					"RETURN c",
				params: {
					userName   : userName,
					otherUser  : otherUser
				}

			}, function(err, results){
				if(err) throw err;
				callback(results[0]? true : false);
			})
		}
	})
	
};


/* 
[ACCEPT_CONNECT]
*/
ConnectionModel.prototype.acceptConnection = function(db, userName, otherUser, callback){
	db.cypher({
		query: 'MATCH (this:User {UserName: {otherUser}})' +
			   '-[rel:REQUEST_CONNECTION]->' +//Gonna fix it later, currently is A->B, need to change it B->A
			   '(other: User{UserName: {userName}}) ' +
			   'CREATE UNIQUE (this)-[c:CONNECTS{date_created:{timeStamp}}]->(other)' +
			   'DELETE rel RETURN c',
		params: {
			userName   : userName,
			otherUser  : otherUser,
			timeStamp  : Date.now()
		}

	}, function(err, results){
		if(err) throw err;
		console.log(results)
		callback(results[0]? true : false);
	})
};


/*
[DELETE_CONNECTION]
*/
ConnectionModel.prototype.deleteConnection = function(db, userName, otherUser, callback){
	db.cypher({
		query: 'MATCH (this:User{UserName:{userName}})'+
		'-[rel:CONNECTS]-' + 
		'(other:User{UserName:{otherUser}})' +
		'DELETE rel',
		params: {
			userName : userName,
			otherUser: otherUser
		}

	}, function(err){
		if(err) throw err;
		callback(true);
	})
};


/*
Rejecting connection, 
replace the REQUEST_CONNECTION relation with REJECT_CONNECTION
*/
ConnectionModel.prototype.rejectConnection = function(db, userName, otherUser, callback){
	db.cypher({
		query: 'MATCH (this:User {UserName: {otherUser}})' +
			   '-[con:REQUEST_CONNECTION]->' +
			   '(other: User{UserName: {userName}})' +
			   ' CREATE UNIQUE (this)-[c:REJECT_CONNECTION]->(other)'+
			   ' DELETE con '+
               "RETURN c",
		params: {
			userName   : userName,
			otherUser  : otherUser
		}

	}, function(err, results){
		if(err) throw err;
		callback(results[0]? true : false);
	})
};

ConnectionModel.prototype.getAllConnReq = function(db,userName,callback) {
	db.cypher({
		
		query: 'MATCH (u:User{UserName:{userName}}),'+
			    '(other:User)-[:REQUEST_CONNECTION]->(u)' +
			    'return other' ,
		params: {
			userName : userName,
		}

	}, function(err, results){
		if(err) throw err;
		callback(results.map(function(item){return {userName:item.other.properties.UserName, pic:item.other.properties.pic}}));
	})
}

/*
gets all the connections from the user
*/
ConnectionModel.prototype.getAllConn = function(db,userName, callback){
	db.cypher({
		
		query: 'MATCH (u:User{UserName:{userName}})'+
			    '-[:CONNECTS]-(other:User)' +
			    'return other' ,
		params: {
			userName : userName,
		}

	}, function(err, results){
		if(err) throw err;
		callback(results.map(function(item){return {userName:item.other.properties.UserName, pic:item.other.properties.pic}}));
	})
}

module.exports = new ConnectionModel();