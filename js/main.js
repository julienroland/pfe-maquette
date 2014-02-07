;(function( $ ){
	var 
	$map = $('.map'),
	$main = $('.main'),
	$win = $(window),
	$winHeight = $(window).height(),
	$winWidth = $(window).width(),
	$htmlBody = $('html,body'),
	$addInfos = $('.addInfos'),
	$menu = $('.banner');


	$(function(){
		/* MAP */
		if($map){
			heightMap();
		}
		/* TEXT-OVERFLOW */
		$(window).resize(ellips);
		ellips();
		/* BARS */
		addInfosBar();
		menu();
		$win.scroll(addInfosBar, menu);
		
		$('.goTo').on('click',function( e ){
			e.preventDefault();
			goTo( $(this) );
		})
	});
	var menu = function(){
		if($htmlBody.scrollTop() > $addInfos.height()){
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
		
		nHeight = toPercent($winHeight , 90) -( $('.banner').height() + $('.addInfos').height());
		$map.css({
			'height':nHeight,
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