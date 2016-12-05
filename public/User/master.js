/*
  parse the content and replace it with a link for hashtags
*/
function parseHashtag(content){
	return content.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		var tag = t.replace("#","%23");
		// the link in link() is the address that it will direct to
		return ('<a onclick = postsGivenHashtag(this.innerHTML)>'+t+'</a>');
	});
}


/* function to parse hashtags and returns
   a list of hashtag (without the # symbol)
*/
function recogHashtag(str){
	var splitted = new Array();
  splitted = str.split(" ");
  var hashtagResult = new Array();

	for (var i = 0; i < splitted.length; i++){
		if (splitted[i].match(/[#]+[A-Za-z0-9-_]/g)){
			hashtagResult.push(splitted[i].replace('#',''));
		}
	}
	return hashtagResult;
};


/*
 function to replace user's own feed from his profile page with
 the posts that is related to the hashtag
*/
function postsGivenHashtag(t){
	var htHeading = '<p id="htHeader"> Posts related to '+t+"</p>";
	t=t.replace('#','');
	$.ajax({
      type:"GET",
      url: 'http://104.236.121.170:3000/api/hashtag/psRelHt?tag='+ t,
      success: function(msg){
					//start success

					// removes the posting form and replace it with the heading
					if($("#posting-form").length){
						$("#posting-form").replaceWith(htHeading);
					}
					else if($("#htHeader").length) {
						$("#htHeader").replaceWith(htHeading);
					}

					// clean the feed from old posts
					$(".feed").empty();
					// add/load the posts that have the hashtag
					console.log(msg);
					if(msg.success){
						msg.message.forEach(function(ms){
							$(".feed").append(
								add(ms.from ,
									  parseHashtag(ms.p.properties.Content),
									  ms.p.id,
									  'someone',// will change to someone who shares the post l8r
									  new Date(ms.p.properties.TimeStamp),
									  ms.p.properties.Visibility,
										false) // if this is false, it wont have the delete button
									)
							}
						)
					}
				// end success
				}
		});
}

var domain = "http://104.236.121.170:3000";
var userPic;

(function($) {
    "use strict";
    if(jQuery!==undefined){
    }
    
    $.ajax({
		type:"get",
		url: 'http://104.236.121.170:3000/api/aUser',
        data:"username="+$(".username-page")[0].id,
		success: function(msg){
			console.log(msg.user);
			$("#userPic").attr("src",'/bird_avatars/'+msg.user.pic+'.png');
			userPic = '/bird_avatars/'+msg.user.pic+'.png';
            $('#profile').append('<img src ="'+domain+'/'+userPic+'" alt="profile" class = "img-rounded" style = "width:200px;height:200px;">')
            $('.collapse1').append('<div class="panel-body">'+ msg.user.AboutMe+'</div>')
		}
	})
    
    
    $(document.body).on('click', '.delete-button', function (e){
        var url = domain+"/api/posting"
        var postId = $(this)[0].id;
        $.ajax({
            type:"DELETE",
            beforeSend: function(request) {
                request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            },
            url: url,
            data:"postId="+postId,
            processData: false,
            success: function(msg){
                console.log(msg)
                $("#panel-id-"+postId).remove()
            }
        })
        e.preventDefault();
    })
    //submits the post by sending a post request to api
    $("#posting-form").submit(function(event) {
        var $inputs = $('#posting-form :input');
        var values = {};
        $inputs.each(function() {
            values[this.name] = $(this).val();
            $(this).val("");
        });
        var url = domain+"/api/posting"
        //get's visibility from the drop down text by removing the unnecessary parts
        var visibility =   $(".privacy-setting").text().replace("Privacy: ", "").replace(" Only", "").toLowerCase();
        $.ajax({
            type:"POST",
            beforeSend: function(request) {
                request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            },
            url: url,
            data:"content="+values.content+"&link=''"+"&visibility="+visibility,
            processData: false,
            success: function(msg){
                console.log(msg)
                $(".feed-content").prepend('<div class="row"> <div class="col-sm-3"> </div> <div class="col-sm-12"> <div class="well"> <p>'+
                values.content+'</p> </div> </div> </div>')
            }
        })
        event.preventDefault();
    });
    //submits a report when the report drop down is clicked sending the reason of report
    //as the selection made in the dropdown
    $(document.body).on('click', '.report-menu li a', function (e){
        var url = domain+"/api/report"
        $.ajax({
            type:"POST",
            beforeSend: function(request) {
                request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            },
            url: url,
            data:"id="+$(this).parent().parent()[0].id+"&reason="+$(this).text(),
            processData: false,
            success: function(msg){
                console.log(msg)
            }
        })
        e.preventDefault();
    })
    //changes the privacy setting(in posting options) when user selects different privacy option
    $( document.body ).on( 'click', '.privacy-menu li a', function( event ) {

      var $target = $( event.currentTarget );
      $target.closest( '.btn-group' )
         .find( '[data-bind="label"]' ).text( 'Privacy: '+$target.text() )
            .end()
         .children( '.dropdown-toggle' ).dropdown( 'toggle' );

      return false;

   });
   //shares the post to the selected user
    $(document.body).on('click', '.share-menu li a', function (e) {
        var url = domain+"/api/share"
        var selText = $(this).text();
        console.log($(this).parent().parent()[0].id)
        console.log(selText);
        $.ajax({
            type:"POST",
            beforeSend: function(request) {
                request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            },
            url: url,
            data:"id="+$(this).parent().parent()[0].id+"&OtherUser="+$(this).text(),
            processData: false,
            success: function(msg){
                console.log(msg)
            }
        })
        
    });
    $(document.body).on('click', '.connect-request', function(e){
        var url = domain+'/api/connection'
        $.ajax({
            type:"POST",
            beforeSend: function(request) {
                request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            },
            url: url,
            data:"destination="+$(location).attr('href').replace('http://104.236.121.170:3000/u/', ''),
            processData: false,
            success: function(msg){
                console.log(msg)
            }
        })
        e.preventDefault();
    })
    $(document.body).on('click', '.logout', function(e){
        document.cookie = "token=; path=/";
        window.location.replace(domain+'/login')
        e.preventDefault();
    })
    //on loading the window the request for posts is sent
    //on the posts getting recieved the connections are requested (for sharing drop down)
    $(window).load(function(){
        var url = domain+"/api/userPosts"
        console.log($(".username-page")[0].id)
        $.ajax({
            type:"GET",
            url: url,
            data:"otherUser="+$(".username-page")[0].id,
            processData: false,
            success: function(msg){
                console.log(msg)
                msg.posts.posts.forEach(function(post){$(".feed").append(add(post["from"] , parseHashtag(post.content), post.id, post.sharedBy, new Date(post.timeStamp), post.privacy, post.isUser))})
                var url = domain+"/api/getAllConnection"
                msg.posts.isConnected?'':$(".connection-button").append('<button type="button" class="btn btn-default connect-request"><i class="fa fa-hand-spock-o fa-lg"></i></i> Connect</button>');
                $.ajax({
                    type:"GET",
                    url: url,
                    success: function(msg){
                        msg.connections.forEach(function(user){$(".conns").each(function(index){
                            if(user.userName!==$(this).parent()[0].id) $(this).prepend('<li><a href="#">'+user.userName+'</a></li>');
                        })})
                        
                    }
                })
            }
        })
    });
})(jQuery)
//returns the html for a post
var add = function(username, status, id, shared, timeStamp, visibility, isUser){
    return '<div id = "panel-id-'+id+'"class="panel panel-default"><div class="panel-heading"><img src="'+userPic+'" class = "profilepic img-rounded" alt="img">'+
    '<span class="user"> <a href="'+domain+'/u/'+username+'">'+username+'</a>'+(shared?'<span style="float:right;"><i class="fa fa-share-alt" aria-hidden="true"></i> <i>shared by '+shared+'</i></span>':'')+
    '<div><small>'+(timeStamp.toString())+'</small></div></div><div class="panel-body">'+status+'</div><div class="panel-footer"><div class = "btn-toolbar">'+
    '<div class="input-prepend input-append">'+(visibility==="public"?'<div class="btn-group" id='+'"'+(shared?shared:username)+'"'+'>'+
    '<button class="btn btn-sm dropdown-toggle" name="recordinput" data-toggle="dropdown"><i class="fa fa-share-alt" aria-hidden="true"></i>'+
    ' Share<span class="caret"></span></button><ul class="dropdown-menu share-menu conns" id='+'"'+id+'"'+'></ul>'+
    '</div>':'')+(!isUser?'<div class="btn-group pull-right" id='+'"'+username+'"'+'>'+
    '<button class="btn btn-sm  dropdown-toggle" name="recordinput" data-toggle="dropdown"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Report'+
    ' <span class="caret"></span></button><ul class="dropdown-menu report-menu" id='+'"'+id+'"'+'><li><a href="#">Offensive</a></li>'+
    '<li><a href="#">Inappropraite</a></li><li><a href="#">Spam</a></li><li><a href="#">Other</a></li></ul>'+
    '</div>':'<button id="'+id+'" class="btn btn-sm  pull-right dropdown-toggle delete-button" name="recordinput" data-toggle="dropdown">Delete</button>')+'</div></div></div>'
}