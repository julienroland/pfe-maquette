;(function( $ ){
	var 
	$map = $('.map'),
	$main = $('.main'),
	$win = $(window),
	nMapHeight,
	nMapPercent = 95,
	$winHeight = $(window).height(),
	$winWidth = $(window).width(),
	$htmlBody = $('html,body'),
	$addInfos = $('.addInfos'),
	$menu = $('.banner'),
	$kotsHeight = $('.kots').outerHeight();


	$(function(){
		/* MAP */
		if($map){
			heightMap();
		}
		/* CONNECTION AND REGISTER */
		$('.connection,.register').css({

		})
		$("#form-range").ionRangeSlider({
    min: 0,                        // min value
    max: 10000,                       // max value
   // from: 30,                       // overwrite default FROM setting
    //to: 80,                         // overwrite default TO setting
    type: "single",                 // slider type
    //step: 10,                       // slider step
    postfix: " mètres",             // postfix text
    //hasGrid: true,                  // enable grid
    //hideMinMax: true,               // hide Min and Max fields
    //hideFromTo: true,               // hide From and To fields
    prettify: true,                 // separate large numbers with space, eg. 10 000
    disable: false,                 // disable the slider
    onChange: function(obj){        // callback, is called on every change
    	$('.label-range').html('Distance ('+obj.fromNumber+'m)');

    },

});
		/* KOTS + REGION */

		heightOfKot();

		/* TEXT-OVERFLOW */
		$(window).resize(ellips,heightOfKot);
		ellips();
		/* BARS */
			//addInfosBar();
			//menu();
			//$win.scroll(addInfosBar, menu);

			$('.goTo').on('click',function( e ){
				e.preventDefault();
				goTo( $(this) );
			})
		});
var heightOfKot = function(){
	if($winWidth > 808){
		$('.kotsByCities').css({
			'height':$kotsHeight,
		});
	}
	else{
		$('.kotsByCities').css('height','auto');
	}
};
var menu = function(){

	if($htmlBody.scrollTop() > ($addInfos.height() + $menu.outerHeight() + nMapHeight)){
		$menu.css({
			'position':'fixed',
			'top':0,
			'left':0,
			'right':0,
		});
	}
	else{
		$menu.css({
			'position':'relative',
		});
	}
};
var addInfosBar = function(){
	if($htmlBody.scrollTop() > 30){
		$addInfos.slideUp();
	}
	else{
		$addInfos.slideDown();
	}
};
var ellips = function(){
	$('.kot .content').ellipsis();
};
var heightMap = function( ){

	nMapHeight = toPercent($winHeight , nMapPercent) -( $('.banner').height() + $('.addInfos').height());
	$map.css({
		'height':nMapHeight,
	});
	$main.css({
		'height':'auto',
		'min-height':'100%',
	});
};
var toPercent = function( nValue , nPercent){
	return (nValue / 100) * nPercent;
};
var goTo = function( $selector ){
	$('html,body').animate({scrollTop: $selector.offset().top}, 'slow');
};
}).call(this,jQuery);