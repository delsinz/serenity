//Kos was here 12:58

(function($) {
    "use strict";
		var domain = "http://104.236.121.170:3000"

	// Options for Message
	//----------------------------------------------
  var options = {
	  'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
	  'btn-success': '<i class="fa fa-check"></i>',
	  'btn-error': '<i class="fa fa-remove"></i>',
	  'msg-success': 'All Good! Redirecting...',
	  'msg-error': 'Wrong login credentials!',
	  'useAJAX': true,
  };

	// Login Form
	//----------------------------------------------
	// Validation
  $("#login-form").validate({
  	rules: {
      lg_username: "required",
  	  lg_password: "required",
    },
  	errorClass: "form-invalid"
  });

	// Form Submission for login
  $(document.body).on('click', '.login-button', function (e){
    console.log("I was clicked");
    if($("#reg_username")[0]){
      console.log($("#reg_username")[0].value)
      var username = $("#reg_username")[0].value
      var password = $("#reg_password")[0].value
      var password_confirm = $("#reg_password_confirm")[0].value
      var email = $("#reg_email")[0].value
      var acceptTC = $("#reg_agree")[0].checked;
      console.log(password===password_confirm);
      console.log(acceptTC);
      if (password===password_confirm && acceptTC) {
        var url = domain+'/api/user/'
        $.ajax({
              type:"POST",
              beforeSend: function (request)
              {
                  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              },
              url: url,
              data: 'username='+username+'&password='+password+'&email='+email+'&gender=a&phoneNumber=0',
              processData: false,
              success: function(msg) {
                //adds the token as cookie
                console.log(msg)
              }
          });
      }
    } else {
      var username = $("#lg_username")[0].value;
      var password = $("#lg_password")[0].value;
      console.log(username);
      console.log(password);

      if(options['useAJAX'] == true){
        var url = domain+"/api/login";
        var url2 = domain+"/Profile";

        $.ajax({
              type:"POST",
              beforeSend: function (request)
              {
                  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              },
              url: url,
              data: 'username='+username+'&password='+password,
              processData: false,
              success: function(msg) {
                //adds the token as cookie
                document.cookie = "token="+msg.token+"; path=/";
                window.location.href = url2
              }
          });
        }
    }
    
      e.preventDefault();
  });

  $(document.body).on('click', '.register-button', function (e){
    var username = $("#reg_username")
    var password = $("#reg_password")
    var password_confirm = $("#reg_password_confirm")
    var email = $("#reg_email")
    var fullname = $("#reg_fullname")
    var isMale = $("#male");
    var isFemale = $("#female");
    var date = $("#date");
    var acceptTC = $("#reg_agree");

    console.log(username);
    console.log(password);
    console.log(password_confirm);
    console.log(email);
    console.log(fullname);
    console.log(isMale);
    console.log(isFemale);
    console.log(date);
    console.log(acceptTC);
  });

	// Register Form
	//----------------------------------------------
	// Validation
  $("#register-form").validate({
  	rules: {
      reg_username: "required",
  	  reg_password: {
  			required: true,
  			minlength: 5
  		},
   		reg_password_confirm: {
  			required: true,
  			minlength: 5,
  			equalTo: "#register-form [name=reg_password]"
  		},
  		reg_email: {
  	    required: true,
  			email: true
  		},
  		reg_agree: "required",
    },
	  errorClass: "form-invalid",
	  errorPlacement: function( label, element ) {
	    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
    		element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
	    }
			else {
  	  	label.insertAfter( element ); // standard behaviour
  	  }
    }
  });

  // Form Submission
  $("#register-form").submit(function() {
  	remove_loading($(this));

		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));

		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });
  
  $(document.body).on('click', 'a[href$="#/register"]', function(e){
    console.log("I was clicked");
    $(':button:first').addClass('register-button');
    
  })

	// Forgot Password Form
	//----------------------------------------------
	// Validation
  $("#forgot-password-form").validate({
  	rules: {
      fp_email: "required",
    },
  	errorClass: "form-invalid"
  });

	// Form Submission
  $("#forgot-password-form").submit(function() {
  	remove_loading($(this));

		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));

		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Loading
	//----------------------------------------------
  function remove_loading($form)
  {
  	$form.find('[type=submit]').removeClass('error success');
  	$form.find('.login-form-main-message').removeClass('show error success').html('');
  }

  function form_loading($form)
  {
    $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
  }

  function form_success($form)
  {
	  $form.find('[type=submit]').addClass('success').html(options['btn-success']);
	  $form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
  }

  function form_failed($form)
  {
  	$form.find('[type=submit]').addClass('error').html(options['btn-error']);
  	$form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
  }

	// Dummy Submit Form (Remove this)
	//----------------------------------------------
	// This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.

})(jQuery);
