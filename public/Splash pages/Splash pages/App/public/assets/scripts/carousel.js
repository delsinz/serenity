//carousel.js
//
//Creates and loads the carousel for theteam.html
//
//Author: Kos Grillis
//
//INFO30005 sem1 2016, The Cool Doves
//


function load(){
    $(".carousel-container + div").css('visibility', 'hidden');
    $('[name=multiples], [name=multiples] + label').css('visibility', 'visible');
    $(".carousel-loader").css('display', 'block');
    $('.inner').animate({marginTop: '-=300px'});
    $('[name=multiples], [name=multiples] + label').animate({marginTop: '-=300px'});
    var html ='';

    //load data from the json file and log it to console to ensure it is there

    $.getJSON('./assets/member-info.json', function(data){
        data.forEach(function(member){
            var imagePath = './assets/images/MemberAvatars/' + member.firstname + '.png';
            html += '<div class="item not-visible" style="text-align:center" id="' + member.firstname + '" onclick="">';
            html += '<img src=' + imagePath + ' style="margin:auto" height="450" width="450">' + '</img>';
            html += '<a href="#' + member.firstname + ' info" style="color:white"><h4>' + member.firstname + ' ' + member.lastname +'</h2></a>';
            html += '<p style="text-align:center">' + 'has the following student number: ' + member.studentnumber + '</p>';
            html += '</div>';
        });

        $('.member-carousel').html(html);
        $('head').append('<link rel="stylesheet" type="text/css" href="./assets/css/carousel-style.css" />');
        $(".carousel-loader").css('display', 'none');
        console.log("done");
    });
}
