(function(e){var t=e(".map"),n=e(".main"),r=e(window),i,s=400,o=100,u=e(window).height(),a=e(window).width(),f=e("html,body"),l=e(".addInfos"),c=e(".banner"),h=e(".nav"),p=e(".mapItem"),d=e("body"),v=e(".kots").outerHeight(),m=e(".overlay"),g=e(".popup"),y=e(".popup.lang"),b=e(".popup.advSearch"),w=e(".closePopup"),E=e(".toSocialLogin"),S=e(".toEmailLogin"),x=e(".loginEmail"),T=e(".loginSocial"),N=e(".toPopup");e(function(){t&&j();N.on("click",L);e(document).keyup(function(e){e.keyCode==27&&A(e)});w.on("click",A);m.on("click",function(e){O(e)});p.find(".head").on("click","a",D);e(".lang").on("click","a",_);h.find(".connection").on("click","a",L);E.on("click",C);S.on("click",k);e("#form-range").ionRangeSlider({min:0,max:1e4,type:"single",postfix:" mètres",prettify:!0,disable:!1,onChange:function(t){e(".label-range").html("Distance ("+t.fromNumber+"m): ")}});e(window).resize(function(){j(e(window).height());B()});B();e(".goTo").on("click",function(t){t.preventDefault();I(e("#main"))})});var C=function(e){e.preventDefault();x.slideUp(function(){T.slideDown()})},k=function(e){e.preventDefault();T.slideUp(function(){x.slideDown()})},L=function(t){t.preventDefault();t.stopPropagation();var n=e(this).attr("data-type");if(n==="lang"){m.css("display","block");y.fadeIn().focus()}else if(n==="advSearch"){m.css("display","block");b.fadeIn().focus()}},A=function(e){e.preventDefault();g.fadeOut("fast");M()},O=function(e){e.preventDefault();g.fadeOut("fast");M()},M=function(){m.css("display","none")},_=function(t){t.preventDefault();e(".otherLanguages").slideToggle()},D=function(t){t.preventDefault();var n=e(this).parent().parent(),r=e(this).parent().next();if(n.hasClass("active"))r.slideUp(function(){n.removeClass("active")});else{p.find(".stuff.active .content").slideUp(function(){e(this).parent().removeClass("active")});p.find(".stuff.active").each(function(){e(this).removeClass("active")});n.addClass("active");r.slideDown();p.find(".stuff").not(".active")}},P=function(){f.scrollTop()>l.height()+c.outerHeight()+i?c.css({position:"fixed",top:0,left:0,right:0}):c.css({position:"relative"})},H=function(){f.scrollTop()>30?l.slideUp():l.slideDown()},B=function(){e(".kot .content").ellipsis()},j=function(r){r?i=F(r,o)-e(".banner").height():i=F(u,o)-e(".banner").height();t.css({height:i,"min-height":s});n.css({height:"auto","min-height":"100%"})},F=function(e,t){return e/100*t},I=function(t){e("html,body").animate({scrollTop:t.offset().top},"slow")}}).call(this,jQuery);(function(e){e.fn.drags=function(t){t=e.extend({handle:"",cursor:"move"},t);if(t.handle==="")var n=this;else var n=this.find(t.handle);return n.css("cursor",t.cursor).on("mousedown",function(n){if(t.handle==="")var r=e(this).addClass("draggable");else var r=e(this).addClass("active-handle").parent().addClass("draggable");var i=r.css("z-index"),s=r.outerHeight(),o=r.outerWidth(),u=r.offset().top+s-n.pageY,a=r.offset().left+o-n.pageX;r.css("z-index",1e3).parents().on("mousemove",function(t){e(".draggable").offset({top:t.pageY+u-s,left:t.pageX+a-o}).on("mouseup",function(){e(this).removeClass("draggable").css("z-index",i)})});n.preventDefault()}).on("mouseup",function(){t.handle===""?e(this).removeClass("draggable"):e(this).removeClass("active-handle").parent().removeClass("draggable")})}}).call(this,jQuery);