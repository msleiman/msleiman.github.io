

$( document ).ready(function() {
    var height = window.innerHeight;
    $("#about").css('height', (height) - 20);
});

$(window).scroll(function(){

    $(".header").addClass('fixed')


});

$(function() {
    // Grab the template script
    var theTemplateScript = $("#portfolio").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    var context = {
        portfolio: [
            { client: 'Trailfinders', img: 'images/trailfinders.png', skills: 'Js - CSS', tag: 'css', link: 'https://www.trailfinders.com/hotels' },
            { client: 'DHL - Timeline', img: 'images/dhl-timeline.png', skills: 'Js - CSS', tag: 'css', link: 'https://adventurerstimeline.discoverdhl.com/' },
            { client: 'Maverick - Allianz Project', img: 'images/allianzriseofdrones.png', skills: 'Js - CSS', tag: 'css', link: 'https://www.allianzriseofdrones.com/' },
            { client: 'Molton Brown - INTO THE UNCHARTED', img: 'images/coastal-cypress.png', skills: 'Js - CSS', tag: 'css', link: 'https://www.moltonbrown.co.uk/store/features/behind-the-fragrance/coastal-cypress-sea-fennel/' },
            //{ client: 'Alibert', img: 'https://preview.ibb.co/ivZAx6/alibert.jpg', skills: 'HTML - CSS', tag: 'css' },
            { client: 'Baby Boy', img: 'images/babyboy.png', skills: 'HTML - CSS', tag: 'css' },
            { client: 'Foxwood', img: 'images/foxwood.png', skills: 'HTML - CSS - JS', tag: 'css' },
            { client: 'Hala Badredine', img: 'images/halabadredine.png', skills: 'HTML - CSS', tag: 'css' },
            { client: 'Portfolio', img: 'images/msleimanportfolio.jpg', skills: 'HTML - CSS', tag: 'css' },
            { client: 'Outdoors', img: 'images/outdoors.jpg', skills: 'skills', tag: 'css' },
            { client: 'Robot and Spark', img: 'images/robot_and_spark_small.jpg', skills: 'skills', tag: 'css' },
            { client: 'Sitara', img: 'images/sitara.png', skills: 'skills', tag: 'css' },
            { client: 'Whlservers', img: 'images/whlservers.jpg', skills: 'skills', tag: 'css' },
            { client: 'LPC', img: 'images/lpc.png', skills: 'skills', tag: 'css' }
        ]
    };

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $(".portfolio").html(theCompiledHtml);
    $(".project").hover(function() {
        $(this).find('#overlay').css('display', 'block');
    }, function() {
        $(this).find('#overlay').css('display', 'none');
    });
});