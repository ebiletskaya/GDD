jQuery(document).ready(function () {
	var overlay_div=jQuery('<div class="nav-overlay"></div>');
    jQuery('body').append(overlay_div);
	jQuery('.menu-btn').click(function () {
		jQuery('body').toggleClass('menu-opened');
		jQuery('.menu-section').slideDown();
		jQuery('.nav-overlay').animate({'bottom':'0'});
	});
	jQuery('.menu-section .close').click(function () {
		jQuery('body').removeClass('menu-opened');
		jQuery('.menu-section').slideUp();
		jQuery('.nav-overlay').animate({'bottom':'100%'});
	});

	jQuery("#partners").responsive_slides({scrollHolder: "div.partners-holder", step: 2});

	var circleHeight = jQuery('.circle-block').width();
	jQuery('.circle-block').css({'height':circleHeight+'px'});

	jQuery('a.scroll-down').click(function(){
		var scroll_down=jQuery(jQuery(this).attr('href')).offset().top;
		jQuery('html,body').animate({scrollTop:scroll_down+'px'}, 1000);
		return false;
	});
	jQuery(window).scroll();
	jQuery(window).resize();
});

jQuery(window).load(function(){
	jQuery(window).resize();
});
jQuery(window).resize(function(){
	var circleHeight = jQuery('.circle-block').width();
	jQuery('.circle-block').css({'height':circleHeight+'px'});
});


