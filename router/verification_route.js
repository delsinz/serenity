var verification = require('../model/verification_model')
var path = require ('path');

module.exports = function(app, db, static,  isLoggedIn) {
	//verify user with his username and the code received in his email
    app.get('/v/:username/:code', function(req,res){
        console.log(req.params.username)
        console.log(req.params.code)
        verification.VerifiyEmail(db, req.params.username, req.params.code, function(result){
            if (result){
                res.redirect('/login')
                req.verified = {success:true, message:'Successfully verified Email'}
            } else{
                res.redirect('/verify?='+req.params.username);
                req.verified = {success:false, message: 'Email was not Successfully Verfied'}
            }
            console.log(result)
            
        })
    })
	//go to verify page.
    app.get('/verify', function(req,res){
        res.render(path.join(__dirname , '..' , '/public/Verify/index.ejs'), {url:'http://104.236.121.170:3000/', username:req.query.username})
    })
    app.get('/api/resend', function(req,res){
        console.log(req.query.username)
        verification.ResendLink(db,req.query.username, function(result){
            if (result) res.json({success:true, message:'resent'})
            else res.json({success:false, message: 'not sent'})
        })
    })
}