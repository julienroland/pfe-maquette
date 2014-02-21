;(function( $ ){
	var 
	$map = $('.map'),
	$main = $('.main'),
	$win = $(window),
	nMapHeight,
	nMapPercent = 100,
	$winHeight = $(window).height(),
	$winWidth = $(window).width(),
	$htmlBody = $('html,body'),
	$addInfos = $('.addInfos'),
	$menu = $('.banner'),
	$mapItem = $('.mapItem'),
	$body = $('body'),
	$kotsHeight = $('.kots').outerHeight(),
	//OVERLAY
	$overlay = $('.overlay'),
	//POPUP
	$popup = $('.popup'),
	$closePopup = $('.closePopup'),
	$toPopup = $('.toPopup');



	$(function(){
		/* MAP */
		if($map){
			heightMap();
		}
		$toPopup.on('click',openPopup);

		$(document).keyup(function( e ){
			if (e.keyCode == 27) {
				closePopup(e);
			}
		});
		$closePopup.on('click',closePopup);

		$overlay.on('click',function( e ){

			hideAllPopup( e );
		});
		$mapItem.find('.head').on('click','a',toggleItem);
		$('.lang').on('click','a',showlanguages);
		/* CONNECTION AND REGISTER */
		$('.connection,.register').css({

		});
		$("#form-range").ionRangeSlider({
			min: 0,                        
			max: 10000,                                        
			type: "single",                                  
			postfix: " mètres",                     
			prettify: true,                
			disable: false,                
			onChange: function(obj){        
				$('.label-range').html('Distance ('+obj.fromNumber+'m): ');
			},

		});

		/* TEXT-OVERFLOW */
		$(window).resize(function(){
			heightMap($(window).height());
			ellips();
		});
		ellips();
		/* BARS */
			//addInfosBar();
			//menu();
			//$win.scroll(addInfosBar, menu);

			$('.goTo').on('click',function( e ){
				e.preventDefault();
				goTo( $('#main') );
			})
		});
var openPopup = function( e ){
	e.preventDefault();
	e.stopPropagation();
	$overlay.css('display','block');
	$popup.fadeIn().focus();
	$popup.drags();	

	
};
var closePopup = function( e ){
	e.preventDefault();
	$popup.fadeOut('fast'); 
	hideOverlay();
};
var hideAllPopup = function( e ){
	e.preventDefault();
	$popup.fadeOut('fast');

	hideOverlay();

};
var hideOverlay = function(){
	$overlay.css('display','none');
};
var showlanguages = function( e ){
	e.preventDefault();
	$('.otherLanguages').slideToggle();
};
var toggleItem = function( e ){
	e.preventDefault();
	var $parent2 = $(this).parent().parent();
	var $parentNext = $(this).parent().next();

	if($parent2.hasClass('active')){
		$parentNext.slideUp(function(){
			$parent2.removeClass('active');
		});

	}
	else{
		$mapItem.find('.stuff.active .content').slideUp(function(){
			$(this).parent().removeClass('active');
		});
		$parent2.addClass('active');
		$parentNext.slideDown();
		$mapItem.find('.stuff').not('.active');

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
var heightMap = function( nWinHeight ){
	
	if(nWinHeight){

		nMapHeight = toPercent(nWinHeight , nMapPercent) -( $('.banner').height());
		
	}else{

		nMapHeight = toPercent($winHeight , nMapPercent) -( $('.banner').height());
	}
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

//DRAG
;(function($) {
	$.fn.drags = function(opt) {

		opt = $.extend({handle:"",cursor:"move"}, opt);

		if(opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}

		return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
			if(opt.handle === "") {
				var $drag = $(this).addClass('draggable');
			} else {
				var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
			}
			var z_idx = $drag.css('z-index'),
			drg_h = $drag.outerHeight(),
			drg_w = $drag.outerWidth(),
			pos_y = $drag.offset().top + drg_h - e.pageY,
			pos_x = $drag.offset().left + drg_w - e.pageX;
			$drag.css('z-index', 1000).parents().on("mousemove", function(e) {
				$('.draggable').offset({
					top:e.pageY + pos_y - drg_h,
					left:e.pageX + pos_x - drg_w
				}).on("mouseup", function() {
					$(this).removeClass('draggable').css('z-index', z_idx);
				});
			});
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
        	if(opt.handle === "") {
        		$(this).removeClass('draggable');
        	} else {
        		$(this).removeClass('active-handle').parent().removeClass('draggable');
        	}
        });

    }
}).call(this,jQuery);