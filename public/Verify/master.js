
var domain = "http://104.236.121.170:3000";

(function($) {
    "use strict";
    if(jQuery!==undefined){
    }
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
    $(document.body).on('click', '.verify-button', function (e){
        var url = domain+"/api/resend"
        console.log('pressed')
        $.ajax({
            type:"GET",
            url: url,
            data:"username="+$(".username")[0].id,
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
    //on loading the window the request for posts is sent
    //on the posts getting recieved the connections are requested (for sharing drop down)
    $(window).load(function(){
        var url = domain+"/api/userPosts"
        console.log($(".username")[0].id)
        /*$.ajax({
            type:"GET",
            url: url,
            data:"otherUser="+$(".username-page")[0].id,
            processData: false,
            success: function(msg){
                console.log(msg)
                msg.posts.posts.forEach(function(post){$(".feed").append(add(post["from"] , parseHashtag(post.content), post.id, post.sharedBy, new Date(post.timeStamp), post.privacy, post.isUser))})
                var url = domain+"/api/getAllConnection"
                msg.posts.isConnected?'':$(".connection-button").append('<button type="button" class="btn btn-default"><i class="fa fa-hand-spock-o fa-lg"></i></i> Connect</button>');
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
        })*/
    });
})(jQuery)