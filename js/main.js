jQuery(document).ready(function () {
	var overlay_div=jQuery('<div class="nav-overlay"></div>');
    jQuery('body').append(overlay_div);
	jQuery('.menu-btn').click(function () {
		jQuery('body').toggleClass('menu-opened');
		jQuery('.menu-section').slideDown();
		fix_sizes();
		jQuery('.nav-overlay').animate({'bottom':'0'});
		setTimeout(function(){
			if(jQuery(window).width()<=767&&jQuery('.menu-section').height()>=jQuery(window).height()){
				console.log(jQuery('.menu-section').height());
				jQuery('body').css({'height':jQuery('.menu-section').height()+'px'});
			}
		},500)
		return false;
	});
	jQuery('.menu-section .close').click(function () {
		jQuery('.menu-section').slideUp();
		jQuery('.nav-overlay').animate({'bottom':'100%'});
		if(jQuery(window).width()<=767&&jQuery('.menu-section').height()>=jQuery(window).height()){
			jQuery('body').css({'height':'auto'});
		}
		setTimeout(function(){
			jQuery('body').removeClass('menu-opened');
		},500)
	});
	var circleHeight = jQuery('.circle-block').width();
	jQuery('.circle-block').css({'height':circleHeight+'px'});

	jQuery('a.scroll-down').click(function(){
		console.log('dd')
		var scroll_down=jQuery(jQuery(this).attr('href')).offset().top;
		jQuery('html,body,#wrapper').animate({scrollTop:scroll_down+'px'}, 1000);
		return false;
	});
	jQuery(window).scroll();
	fix_sizes();
});

jQuery(window).load(function(){
	jQuery("#partners").responsive_slides({scrollHolder: "div.partners-holder", step: 2});
	fix_sizes();
});
jQuery(window).resize(function(){
	var circleHeight = jQuery('.circle-block').width();
	jQuery('.circle-block').css({'height':circleHeight+'px'});
	fix_sizes();
});


function fix_sizes(){
	jQuery('.menu-section .column').equalizeHeight({
		'equaltop' : true
	});
}


(function( $ ) {
	$.fn.equalizeHeight = function(options) {
		var settings = $.extend({
			'maxWindowWidth' : false,
			'equaltop' : false
		}, options);
		this.css({'height':'inherit'});
		if(!settings.maxWindowWidth || settings.maxWindowWidth<$(window).width()){
			var maxHeight=0;
			var curentTop=false;
			var tempArray=new Array();
			if(!settings.equaltop){
				this.each(function(index,el){
					maxHeight = Math.max(maxHeight,$(el).css('box-sizing')=='border-box'? $(el).innerHeight(): $(el).height() );
				});
				this.css({'height':maxHeight+'px'});
			}
			else{
				this.each(function(index,el){
					if(curentTop===false||Math.abs(curentTop-$(el).offset().top)>1){
						$(tempArray).css({'height':maxHeight+'px'});
						maxHeight=0;
						curentTop=Math.floor($(el).offset().top);
						tempArray=new Array();
					}
					maxHeight = Math.max(maxHeight,$(el).css('box-sizing')=='border-box'? $(el).innerHeight(): $(el).height() );
					tempArray.push(el);
				})
				$(tempArray).css({'height':maxHeight+'px'});
			}
		}

	};
})(jQuery);