jQuery(document).ready(function () {
	jQuery("#partners").responsive_slides({scrollHolder: "div.partners-holder", step: 2});

	var circleHeight = jQuery('.circle-block').width();
	jQuery('.circle-block').css({'height':circleHeight+'px'});
});

$(window).load(function(){

});
$(window).resize(function(){
	var circleHeight = jQuery('.circle-block').width();
	jQuery('.circle-block').css({'height':circleHeight+'px'});
});

$(window).scroll(function(){

});
