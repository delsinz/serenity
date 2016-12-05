var ProfileModel = function(){
    
};

ProfileModel.prototype.GetFeed = function(db, userName, timeStamp) {
    db.cypher({
        query: 'MATCH (u:User {UserName:{userName}}) MATCH (u)-[CONNECTS]-(f)'+
               ' MATCH (f)-[pst:POSTED]-(p:Post) WHERE pst.time_posted<{timeStamp} return p '+
               ' ORDER BY pst.time_posted DESC LIMIT 20',
        params: {
            userName:userName,
            timeStamp: timeStamp
        }
    })
}