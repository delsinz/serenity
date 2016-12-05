// Master Router ======================================================================
module.exports = function(app, static, passport, db) {
    require('./index_route.js')(app, static, isLoggedIn);
    require('./user_route.js')(app, db, isLoggedIn);
    require('./connection_route.js')(app, db, isLoggedIn);
	require('./posting_route.js')(app, db, isLoggedIn);
	require('./hashtag_route.js')(app, db, isLoggedIn);
	require('./report_route.js')(app, db, isLoggedIn);
  require('./goal_route.js')(app, db, isLoggedIn);
  require('./verification_route.js')(app, db, static, isLoggedIn)

}

//checks if the user is authenticated
var isLoggedIn = require('../config/jsonwebtoken').isLoggedIn;
