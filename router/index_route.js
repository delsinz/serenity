module.exports = function(app, static, isLoggedIn) {
    app.get('/', function(req,res){
        //shows any authentication errors that come with login and signup
        console.log(req.cookies);
    });
    app.use( static( "public/User" ) );
    app.use( static( "public/Verify" ) );
	app.use( static( "public/moderator" ) );
    app.use(static("public/connections"))
    app.use('/profile', [isLoggedIn, static('./public/Profile')]);
    app.use('/profile/connections', [isLoggedIn, static('./public/connections')]);
    app.use('/doc', static('./doc'));
    app.use('/login', static('./public/login'));
	//app.use('/moderator', [isLoggedIn,static('./public/moderator')]);

    app.use('/login', static('./public/login/public'));
    app.use('/verify', static('./public/Verify'))
	app.use('/moderator', [isLoggedIn,static('./public/moderator')]);
}
