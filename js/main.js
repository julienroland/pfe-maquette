;(function( $ ){
	var 
	$map = $('.map'),
	$main = $('.main'),
	$winHeight = $(window).height();
	$winWidth = $(window).height();

	$(function(){
		if($map){
			heightMap();
			
		}
		$('.kot .content').ellipsis();
		$('.goTo').on('click',function( e ){
			e.preventDefault();
			goTo( $(this) );
		})
	});
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