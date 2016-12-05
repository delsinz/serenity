
(function($) {
    "use strict";
    if(jQuery!==undefined){
    }
    $(document.body).on('click', '.logout', function(e){
        document.cookie = "token=; path=/";
        window.location.replace('http://104.236.121.170:3000/login')
        e.preventDefault();
    })
    
})(jQuery)