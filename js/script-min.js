$(document).ready(function(){var s=window.innerHeight;$("#about").css("height",s-20)}),$(window).scroll(function(){$(".header").addClass("fixed")}),$(function(){var s=$("#portfolio").html(),i=Handlebars.compile(s)({portfolio:[{client:"Trailfinders",img:"https://api.miniature.io/?width=668&height=415&delay=5&url=https%3A%2F%2Fwww.trailfinders.com%2Fhotels&dt=1551647781510",skills:"Js - CSS",tag:"css",link:"https://www.trailfinders.com/hotels"},{client:"DHL - Timeline",img:"images/dhl-timeline.png",skills:"Js - CSS",tag:"css",link:"https://goo.gl/a4jcvq"},{client:"Maverick - Allianz Project",img:"images/allianzriseofdrones.png",skills:"Js - CSS",tag:"css",link:"https://www.allianzriseofdrones.com/"},{client:"Molton Brown - INTO THE UNCHARTED",img:"images/coastal-cypress.png",skills:"Js - CSS",tag:"css",link:"https://www.moltonbrown.co.uk/store/features/behind-the-fragrance/coastal-cypress-sea-fennel/"},{client:"Baby Boy",img:"https://preview.ibb.co/ce6CAR/babyboy.png",skills:"HTML - CSS",tag:"css"},{client:"Foxwood",img:"https://preview.ibb.co/eiLuPm/foxwood.png",skills:"HTML - CSS - JS",tag:"css"},{client:"Hala Badredine",img:"https://preview.ibb.co/n7BOH6/halabadredine.png",skills:"HTML - CSS",tag:"css"},{client:"Portfolio",img:"https://image.ibb.co/iefHc6/msleiman_portfolio.jpg",skills:"HTML - CSS",tag:"css"},{client:"Outdoors",img:"https://preview.ibb.co/h1skVR/outdoors.jpg",skills:"skills",tag:"css"},{client:"Robot and Spark",img:"https://image.ibb.co/mq8EPm/robot_and_spark_small.jpg",skills:"skills",tag:"css"},{client:"Sitara",img:"https://preview.ibb.co/jGyEPm/sitara.png",skills:"skills",tag:"css"},{client:"Whlservers",img:"https://preview.ibb.co/iLecc6/whlservers.jpg",skills:"skills",tag:"css"},{client:"LPC",img:"https://preview.ibb.co/itLuPm/lpc.png",skills:"skills",tag:"css"}]});$(".portfolio").html(i),$(".project").hover(function(){$(this).find("#overlay").css("display","block")},function(){$(this).find("#overlay").css("display","none")})});