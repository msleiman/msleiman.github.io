

$( document ).ready(function() {
    var height = window.innerHeight;
    $("#about").css('height', (height) - 40);
});



// $(window).scroll(function(){
//
//     var height = window.innerHeight;
//
//
// });

$(function() {
    // Grab the template script
    var theTemplateScript = $("#portfolio").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    var context = {
        portfolio: [
        
            { client: 'DHL Timeline', img: 'https://preview.ibb.co/ivZAx6/alibert.jpg', skills: 'skills', tag: 'css', link: 'https://discover.dhl.com/culture-hype/future-of-exports/those-that-did-it-first.html' },
            { client: 'alibert', img: 'https://preview.ibb.co/ivZAx6/alibert.jpg', skills: 'skills', tag: 'css' },
            { client: 'Baby Boy', img: 'https://preview.ibb.co/ce6CAR/babyboy.png', skills: 'css', tag: 'css' },
            { client: 'Foxwood', img: 'https://preview.ibb.co/eiLuPm/foxwood.png', skills: 'skills', tag: 'css' },
            { client: 'Hala Badredine', img: 'https://preview.ibb.co/n7BOH6/halabadredine.png', skills: 'skills', tag: 'css' },
            { client: 'Portfolio', img: 'https://image.ibb.co/iefHc6/msleiman_portfolio.jpg', skills: 'skills', tag: 'css' },
            { client: 'Outdoors', img: 'https://preview.ibb.co/h1skVR/outdoors.jpg', skills: 'skills', tag: 'css' },
            { client: 'Robot and Spark', img: 'https://image.ibb.co/mq8EPm/robot_and_spark_small.jpg', skills: 'skills', tag: 'css' },
            { client: 'Sitara', img: 'https://preview.ibb.co/jGyEPm/sitara.png', skills: 'skills', tag: 'css' },
            { client: 'Whlservers', img: 'https://preview.ibb.co/iLecc6/whlservers.jpg', skills: 'skills', tag: 'css' },
            { client: 'LPC', img: 'https://preview.ibb.co/itLuPm/lpc.png', skills: 'skills', tag: 'css' }
        ]
    };

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $(".portfolio").html(theCompiledHtml);
});