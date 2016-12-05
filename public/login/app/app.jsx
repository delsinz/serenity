//app.jsx for serenity splash page
//
//Defines the functionality for a user to login/register to the website
//
//HTML by Delsin Zhange, minor modifications by Kos Grillis
//React code by Kos Grillis
//
//INFO30005, sem1 2016 The Cool Doves
//

var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
var {Link, IndexLink} = require('react-router');
var {OverlayTrigger, Tooltip} = require('react-bootstrap');

var Main = React.createClass({
    render: function(){
        return(
            <div>
                <header>
                    <img src="./assets/images/logo.png" height="130" width="120"></img>
                    <Router history={hashHistory}>
                        <Route path='/' component={SerenitySplash}/>
                        <Route path='login' component={Login}/>
                        <Route path='register' component={Register}/>
                        <Route path='forgotpw' component={ForgotPassword}/>
                        <Route path='termsconditions' component={TCPanel}/>
                    </Router>

                </header>
            </div>
        );
    }
});

var TCPanel = React.createClass({
    render: function(){
        var panelStyle = {
            marginTop: '30px',
            backgroundColor: 'rgba(245, 245, 245, 0.2)'
        };

        return (
            <div>
                <div className="panel panel-default" style={panelStyle}>
                    <div className="panel-heading">Serenity: Terms and Conditions</div>
                    <div className="panel-body">
                        Here are lots of terms
                        <br/>
                        wow theres even conditions
                    </div>
                </div>
                <div>
                    <Link to='/register' activeClassName='active' styles='text-align: center'>Okay, got it</Link>
                </div>
            </div>
        );
    }
});

var ForgotPassword = React.createClass({
    render: function(){
        return(
            <div className="text-center" styles="padding:50px 0">
                <div className="logo">forgot password</div>
            	<div className="login-form-1">
            		<form id="forgot-password-form" className="text-left">
                        <div className="etc-login-form">
            				<p>Please enter your registered email address.</p>
            			</div>
            			<div className="login-form-main-message"></div>
            			<div className="main-login-form">
            				<div className="login-group">
            					<div className="form-group">
            						<label htmlFor="fp_email" className="sr-only">Email address</label>
            						<input type="text" className="form-control" id="fp_email" name="fp_email" placeholder="email address"></input>
            					</div>
            				</div>
            				<button type="submit" className="login-button"><i className="fa fa-chevron-right"></i></button>
            			</div>
            			<div className="etc-login-form" styles='margin-top: 30px'>
            				<p>Already have an account? <Link to='/login' activeClassName='active'>Login here</Link></p>
            				<p>New user? <Link to='/register' activeClassName='active'>create new account</Link></p>
            			</div>
            		</form>
            	</div>
            </div>
        );
    }
});

var Register = React.createClass({

    render: function(){
        var dateStyles = {
            border: '1px solid #E5E4E2',
            visibility: 'hidden'
        };

        const tooltip = (
            <Tooltip>Terms & Conditions</Tooltip>
        );

        return(
            <div className="text-center" styles="padding:50px 0">
                <div className="logo">register</div>
                <div className="login-form-1">
        		    <form id="register-form" className="text-left">
        			    <div className="login-form-main-message"></div>
        			    <div className="main-login-form">
        				    <div className="login-group">
        					    <div className="form-group">
        						    <label htmlFor="reg_username" className="sr-only">Email address</label>
        						    <input type="text" className="form-control" id="reg_username" name="reg_username" placeholder="username"></input>
        					    </div>
        					    <div className="form-group">
        						    <label htmlFor="reg_password" className="sr-only">Password</label>
        						    <input type="password" className="form-control" id="reg_password" name="reg_password" placeholder="password"></input>
        					    </div>
        					    <div className="form-group">
        						    <label htmlFor="reg_password_confirm" className="sr-only">Password Confirm</label>
        						    <input type="password" className="form-control" id="reg_password_confirm" name="reg_password_confirm" placeholder="confirm password"></input>
        					    </div>

        					    <div className="form-group">
        						    <label htmlFor="reg_email" className="sr-only">Email</label>
        						    <input type="text" className="form-control" id="reg_email" name="reg_email" placeholder="email"></input>
        					    </div>
        					    <div className="form-group">
        						    <label htmlFor="reg_fullname" className="sr-only">Full Name</label>
        						    <input type="text" className="form-control" id="reg_fullname" name="reg_fullname" placeholder="full name"></input>
        					    </div>
        					    <div className="form-group login-group-checkbox">
        						    <input type="radio" className="" name="reg_gender" id="male" placeholder="username"></input>
        						    <label htmlFor="male">male</label>

        						    <input type="radio" className="" name="reg_gender" id="female" placeholder="username"></input>
        						    <label htmlFor="female">female</label>
        					    </div>
                                <div className='form-group'>
                                    <div id="date" className="input-group date" data-provide='datepicker'>
                                        <input type="text" className="form-control" placeholder='date of birth'></input>
                                        <div className="input-group-addon" style={dateStyles}>
                                            <span className="glyphicon glyphicon-th"></span>
                                        </div>
                                    </div>
                                </div>
        					    <div className="form-group login-group-checkbox">
        						    <input type="checkbox" className="" id="reg_agree" name="reg_agree"></input>
        						    <label htmlFor="reg_agree">I agree with the <OverlayTrigger placement="bottom" overlay={tooltip}><Link to='/termsconditions' activeClassName='active'>T&C's</Link></OverlayTrigger></label>
        					    </div>
        				    </div>
        				    <button type="submit" className="register"><i className="fa fa-chevron-right"></i></button>
        			    </div>
        			    <div className="etc-login-form">
        				    <p>Already have an account? <Link to='/login' activeClassName='active'>Login here</Link></p>
        			    </div>
        		    </form>
                    <Link to='/' activeClassName='active' styles='text-align: center'>Not yet. Take me back.</Link>
        	    </div>
            </div>
        );
    }
});

var Login = React.createClass({

    render: function(){

        return(
            <div className="text-center" styles="padding: 50px 0">
                <div className="logo">login</div>

            	<div className="login-form-1">
            		<form id="login-form" className="text-left">
            			<div className="login-form-main-message"></div>
            			<div className="main-login-form">
            				<div className="login-group">
            					<div className="form-group">
            						<label htmlFor="lg_username" className="sr-only">Username</label>
            						<input type="text" className="form-control" id="lg_username" name="lg_username" placeholder="username"></input>
            					</div>
            					<div className="form-group">
            						<label htmlFor="lg_password" className="sr-only">Password</label>
            						<input type="password" className="form-control" id="lg_password" name="lg_password" placeholder="password"></input>
            					</div>
            					<div className="form-group login-group-checkbox">
            						<input type="checkbox" id="lg_remember" name="lg_remember"></input>
            						<label htmlFor="lg_remember">remember</label>
            					</div>
            				</div>
            				<button type="submit" className="login-button"><i className="fa fa-chevron-right"></i></button>
            			</div>
            			<div className="etc-login-form">
            				<p>Forgot your password? <Link to='/forgotpw' activeClassName='active'>click here</Link></p>
            				<p>New user? <Link to='/register' activeClassName='active'>create new account</Link></p>
            			</div>
            		</form>
                    <Link to='/' activeClassName='active' styles='text-align: center'>Not yet. Take me back.</Link>
            	</div>

            </div>
        );
    }
});



var Button_ = React.createClass({

    render: function(){
        var bStyle = {
            align: 'center'
        };

        return(
            <Link to='/login' activeClassName='active' className="button circled scrolly">Take Off</Link>
        );
    }
});

var SerenitySplash = React.createClass({

    render: function(){

        var pStyle = {
            textAlign: 'center',
        };

        var footStyle = {
            marginTop: '60px'
        };

        return(
            <div>
                <div>
                    <h1><a href="index.html" id="logo">Serenity</a></h1>
                    <hr></hr>
                    <p style={pStyle}>Fly Again</p>
                </div>
                <footer style={footStyle}>
                    <Button_/>
                </footer>
            </div>
        );
    }

});

ReactDOM.render(<Main/>, document.getElementById('app'));
