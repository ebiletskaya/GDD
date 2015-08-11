$(window).scroll(function(e){
	e.preventDefault();
	var wst = $(window).scrollTop();
	if(wst>128){
		$('.header-holder').addClass('minimized').css({'position' : 'fixed'});
		if(navigator.userAgent.indexOf("MSIE") != -1){
			$('#container').css({'padding' : "245px 0 0 0"});
		}
		else{
			$('#container').css({'padding' : "245px 0 0 0"});
		}
	}
	else{
		$('.header-holder').removeClass('minimized').css({'position':'static'});
		$('#container').css({'padding' : "0 0 0 0"});
	}
	if(wst>175){
		$('.aside').css({'top':'70px'});
		$('.aside').css({'position':'fixed'});
	}
	else{
		$('.aside').css({'top':'245px'});
		$('.aside').css({'position':'static'});
	}
});

jQuery(document).ready(function () {
	jQuery('.search-bar .search-text').focus(function(){
		jQuery(this).parents('.search-bar').css({'border':'1px solid #00adef'});
	});
	jQuery('.search-bar .search-text').focusout(function(){
		jQuery(this).parents('.search-bar').css({'border':'1px solid #dddddd'});
	});
	jQuery('#doctor-menu-list li').each(function(index, el){
		if(jQuery(el).find('> ul').length){
			if(jQuery(el).hasClass('active')){
				var active=0;
			}
			else{
				var active=false;
			}
			jQuery(el).accordion({
				active: active,
				heightStyle: "content",
				collapsible: true
			});
			jQuery(el).attr('class','');
			if(active!==false){
				jQuery(el).addClass('active');
			}
			jQuery(el).find('*').each(function(index,el){
				if(el.className.indexOf('active')!=-1){
					el.className='active';
				}
				else{
					el.className='';
				}
			});
			jQuery(el).find('a').mouseenter(function(){
				var self = this;
				jQuery(self).attr('class','')
				return true;
			});
		}
	});
    jQuery('#center-scroll-menu a').click(function(){
        $('html,body').animate({scrollTop: jQuery(jQuery(this).attr('href')).offset().top},'slow');
        return false;
    });
	jQuery('.faq li h4 a').click(function(){
		if(jQuery(this).hasClass('expanded')){
			jQuery(this).parents('li').eq(0).find('.read-less a').click();
		}
		else{
			jQuery(this).parents('li').eq(0).find('.read-more a').click();
		}
		jQuery(this).toggleClass('expanded');
		return false;
	})
	jQuery('.faq li .answer').expander({
		preserveWords: true,
		slicePoint: 178
	});

    jQuery(document).on('change','.health-statement input[type="file"]',function(){
        var name=jQuery(this).val().split('\\').pop();
        if(name){
            jQuery(this).parents('.file-text').eq(0).show('slow').css({'display':'block'}).find('em').text(name);
        }
        else{
            jQuery(this).parents('.file-text').eq(0).hide('slow');
        }
    });
    jQuery('span.hide').hide('10');
    jQuery('#upload_label').on('click', function(e){
        jQuery('span.hide:not(:visible):first').find('input').click();
        e.preventDefault();
    });
    jQuery('a.delete').on('click', function(e){
        var input_parent = jQuery(this).parent();
        var input_wrap = input_parent.find('span');
        input_wrap.html(input_wrap.html());
        jQuery(this).parents('.file-text').eq(0).hide('slow');
        e.preventDefault();
    });

    jQuery('a.add-analysis').click(function(){
        jQuery(this).parents('.analysis').eq(0).find('.row').not('.visible').eq(0).addClass('visible');
        return false;
    });
	initAutoScalingNav({
		menuId: "main-navigation-list",
		flexible: true
	});
	
	
	jQuery('.knewsemail input').attr('placeholder','דואר אלקטרוני')
	$('.sponsors').bxSlider({
		mode: 'fade',
	    auto: true,
	    controls: false,
	    pager: false,
	    speed: 1000
	});
	
	jQuery('.body-popup .vscrollable').slimScroll({
		size: '5px',
		color: '#c2c2c2',
	    alwaysVisible: true,
        height: '610px'
    });
	
	jQuery(".body-popup").tabs();
	
	TestimonialsSlider();
    var keyInterval=false;
    jQuery('.search-text').attr("autocomplete", "off");
    jQuery('.search-text').focusout(function(){
        setTimeout(function(){
            jQuery('.results-dropdown, .results-drop').css({'display':'none'});
        },500);
        return true;
    });
    jQuery('.search-text').keyup(function(){
        if(this.value.length){
            var _parent=jQuery(this).parent();
            if(keyInterval){
                clearTimeout(keyInterval);
            }
            keyInterval=window.setTimeout(function(){
                jQuery.post(window.location.href,{'search-type':_parent.find('.search-type').val(),'text':_parent.find('.search-text').val()},function(data){
                    if(data){
                        _parent.find('.results-dropdown, .results-drop ul').html(data);
                        _parent.find('.results-dropdown, .results-drop').css({'display':'block'});
                    }
                },'text')
                clearTimeout(keyInterval);
            },500);
        }
        return false;
    });
	jQuery('.search-button').click(function(){
		if(jQuery(window).width()<=767){
			jQuery('#header .search-bar-holder').toggle();
		}
		return false;
	});
    jQuery('.menu-btn').click(function(){
        if(jQuery(this).hasClass('active')){
            var self = this;
            jQuery('.mobile-navside-holder').animate({'left': '100%'}, function(){
                jQuery(self).removeClass('opened')
            });
            jQuery('#wrapper').css({'height' : 'auto'});
        }
        else{
            jQuery('.mobile-navside-holder').animate({'left':'0'}).addClass('opened');
            jQuery('#wrapper').css({'height' : '100%'});
        }
        jQuery(this).toggleClass('active')
        return false;
    });
    var menu_div=jQuery('<div class="mobile-navside-holder"><div class="mobile-navside"></div></div>');
    jQuery('body').append(menu_div);
    jQuery('.mobile-navside').html('<ul class="top-nav">'+jQuery('ul.top-nav').html()+'</ul><ul class="main-navigation-list">'+jQuery('#main-navigation-list').html()+'</ul><ul class="languages">'+jQuery('.lang_sel_list_horizontal ul').html()+'</ul>');
	$('input[type="checkbox"], input[type="radio"]').ezMark();
	jQuery('.mobile-navside a').click(function(){
		if(jQuery(this).parent().find('>.drop').length){
			jQuery(this).parent().toggleClass('drop-opened');
			jQuery(this).parent().find('>.drop').slideToggle();
			return false;
		}
		return true;
	});
	$(".mobile-footer-bar .contact-us-btn").click(function(){
		$(".mobile-contact-popup").dialog({
			width: 530,
			modal: true
		});
		return false;
	})
	
	$(".call-btn").click(function(){
		$(".click-to-call-popup").dialog({
			width: 540,
			modal: true,
			dialogClass: "click-to-call-holder"
		});
		return false;
	})
	
	$(".contact-doctor").click(function(){
        var img=jQuery(this).parents('.doctor-info').eq(0).find('.photo img').attr('src');
        var name=jQuery(this).parents('.doctor-info').eq(0).find('.name a').html();
        if(!name){
            name=jQuery(this).parents('.doctor-info').eq(0).find('.name').html();
        }
        jQuery('.contact-doctor-popup').find('.doctor-info img').attr('src',img);
        jQuery('.contact-doctor-popup').find('.doctor-description .doctor-name').html(name);
        jQuery('.contact-doctor-popup').find('.ask-expert-form .doctor-name').attr('value',name);

		$(".contact-doctor-popup").dialog({
			width: 530,
			modal: true
		});
		return false;
	})
	
	$(".ask-expert-btn, .ask-expert-btn a").click(function(){
		$(".ask-expert-popup").dialog({
			width: 530,
			modal: true
		});
		return false;
	})
	
	$(".body-search-btn").click(function(){
		$(".body-popup").dialog({
			width: 702,
			modal: true
		});
		return false;
	})
	
	$("body").on("click", ".ui-widget-overlay, .close-dialog, .cancel-call", function () {
		$('.ui-dialog-content:visible').dialog("close");
        $('#wrapper').css({'height':'auto'});
	});
    $(document).on("dialogopen", ".ui-dialog", function(event, ui) {
        console.info('dialog');
        $('#wrapper').css({'height':'100%'});
    });
	jQuery('.main-banner .switcher ul').bxSlider({
        pager:false,
        autoDirection:false,
        slideWidth: 176,
        maxSlides:4,
        minSlides:2,
        moveSlides:2
    });
    jQuery('.main-banner .switcher ul li').eq(0).addClass('active-new');
	$('.main-banner .slides').bxSlider({
		pagerCustom: '.main-banner .switcher ul',
        mode: 'fade',
		controls: false,
        autoDirection:false,
		auto: true,
        onSlideAfter:function($slideElement, oldIndex, newIndex){
            jQuery('.main-banner .switcher ul a[data-slide-index="'+newIndex+'"]').parent().addClass('active-new');
            jQuery('.main-banner .switcher ul a[data-slide-index="'+oldIndex+'"]').parent().removeClass('active-new');
        },
        onSliderLoad:function(currentIndex){
            jQuery('.main-banner .switcher ul a[data-slide-index="'+currentIndex+'"]').parent().addClass('active-new');
        }
	});
    jQuery('.main-banner .switcher ul a').mouseenter(function(){
        var self=this;
        this.isHoverClick=true;
        setTimeout(function(){self.isHoverClick=false;},10)
        jQuery(this).click();
        return true;
    });
    jQuery('.main-banner .switcher ul a').click(function(val){
        if(!this.isHoverClick){
            window.location.href=this.href;
        }
    });

    /*jQuery('.main-banner .switcher ul a').click(function(){
        jQuery(this).parent().addClass('active-new');
        jQuery('.main-banner .switcher ul li').not(jQuery(this).parent()).removeClass('active-new')
        return true;
    });*/
	$("select").selectbox();
    setInterval(function(){
        if(jQuery('.upload-file-container .wpcf7-not-valid').length){
            jQuery('#upload_label').addClass('wpcf7-not-valid');
        }
        else{
            jQuery('#upload_label').removeClass('wpcf7-not-valid');
        }
    },500)
    if(jQuery(window).width()<=580){
        jQuery('.popup .doctor-info').prepend(jQuery('.popup .doctor-info h3'));
    }
    else{
        jQuery('.popup .doctor-description').prepend(jQuery('.popup .doctor-info h3'));
    }
});

$(window).load(function(){

});
$(window).resize(function(){
	TestimonialsSlider();
    /*fix_mobile_menu();*/
    if(jQuery(window).width()<=580){
        jQuery('.popup .doctor-info').prepend(jQuery('.popup .doctor-info h3'));
    }
    else{
        jQuery('.popup .doctor-description').prepend(jQuery('.popup .doctor-info h3'));
    }
});

$(window).scroll(function(){
    scroll_sidebar();
    /*fix_mobile_menu()*/
});

function scroll_sidebar(){
    var wh=$(window).height();
    var fh=$('#footer').height();
    var bh=$('#wrapper').height()+fh;
    var sh=$('.aside').height();
    var wtop=$(window).scrollTop();
    if(wtop>175){
        if((sh+fh)>wh&&(bh-wtop-fh-sh)<0){
            //console.info(bh+'-'+wh+'-'+wtop+'='+(bh-wh-wtop));
            $('.aside').css({
                'top':(-(fh-(bh-wh-wtop)))+'px'
            });
        }
        else{
            $('.aside').css({
                'top':70+'px'
            });
        }
    }
}
function fix_mobile_menu(){
    if(jQuery(window).width()<=667&&jQuery('.mobile-navside-holder').hasClass('opened')){
        var wh=jQuery(window).height();
        var wtop=jQuery(window).scrollTop();
        var sh=jQuery('.mobile-navside-holder').innerHeight();
        if(wh+wtop>sh&&sh>wh){
            jQuery('.mobile-navside-holder').css({'position':'fixed','bottom':0,'top':'auto','margin':0});
        }
        else{
            jQuery('.mobile-navside-holder').css({'position':'absolute','top':0,'bottom':'auto','margin':0});
        }
    }
    return false;
}

var testimonialSliderEl = false;

function TestimonialsSlider(){
	if (jQuery(window).width() <= 640) {
		if(testimonialSliderEl){
			testimonialSliderEl.destroySlider();
			testimonialSliderEl = false;
		}
	}
	else{
		if(!testimonialSliderEl){
			testimonialSliderEl = $('.testimonials-section .two-columns').bxSlider({
				slideWidth: 368,
			    minSlides: 2,
			    maxSlides: 2,
			    slideMargin: 10,
			    auto: false,
			    controls: false,
			    pager: false,
			    speed: 1000
			});
		}
	}
}

function initPage() {
	
}
function initAutoScalingNav(o) {
	if (!o.menuId) o.menuId = "nav";
	if (!o.tag) o.tag = "a";
	if (!o.spacing) o.spacing = 0;
	if (!o.constant) o.constant = 0;
	if (!o.minPaddings) o.minPaddings = 0;
	if (!o.liHovering) o.liHovering = false;
	if (!o.sideClasses) o.sideClasses = false;
	if (!o.equalLinks) o.equalLinks = false;
	if (!o.flexible) o.flexible = false;
	var nav = document.getElementById(o.menuId);
	if(nav) {
		nav.className += " scaling-active";
		var lis = nav.getElementsByTagName("li");
		var asFl = [];
		var lisFl = [];
		var width = 0;
		for (var i=0, j=0; i<lis.length; i++) {
			if(lis[i].parentNode == nav) {
				var t = lis[i].getElementsByTagName(o.tag).item(0);
				asFl.push(t);
				asFl[j++].width = t.offsetWidth;
				lisFl.push(lis[i]);
				if(width < t.offsetWidth) width = t.offsetWidth;
			}
			if(o.liHovering) {
				lis[i].onmouseover = function() {
					this.className += " hover";
				}
				lis[i].onmouseout = function() {
					this.className = this.className.replace("hover", "");
				}
			}
		}
		var menuWidth = nav.clientWidth - asFl.length*o.spacing - o.constant;
		if(o.equalLinks && width * asFl.length < menuWidth) {
			for (var i=0; i<asFl.length; i++) {
				asFl[i].width = width;
			}
		}
		width = getItemsWidth(asFl);
		if(width < menuWidth) {
			for (var i=0; getItemsWidth(asFl) < menuWidth; i++) {
				asFl[i].width++;
				if(!o.flexible) {
					asFl[i].style.width = asFl[i].width + "px";
				}
				if(i >= asFl.length-1) i=-1;
			}
			if(o.flexible) {
				for (var i=0; i<asFl.length; i++) {
					width = (asFl[i].width - o.spacing - o.constant/asFl.length)/menuWidth*100;
					if(i != asFl.length-1) {
						lisFl[i].style.width = width + "%";
					}
					else {
						if(!/MSIE (6|7)/.test(navigator.userAgent)) {
							lisFl[i].style.width = width + "%";
						}
					}
				}
			}
		}
		else if(o.minPaddings > 0) {
			for (var i=0; i<asFl.length; i++) {
				asFl[i].style.paddingLeft = o.minPaddings + "px";
				asFl[i].style.paddingRight = o.minPaddings + "px";
			}
		}
		if(o.sideClasses) {
			lisFl[0].className += " first-child";
			lisFl[0].getElementsByTagName(o.tag).item(0).className += " first-child-a";
			lisFl[lisFl.length-1].className += " last-child";
			lisFl[lisFl.length-1].getElementsByTagName(o.tag).item(0).className += " last-child-a";
		}
		nav.className += " scaling-ready";
	}
	function getItemsWidth(a) {
		var w = 0;
		for(var q=0; q<a.length; q++) {
			w += a[q].width;
		}
		return w;
	}
}
if (window.addEventListener)
	window.addEventListener("load", initPage, false);
else if (window.attachEvent)
	window.attachEvent("onload", initPage);


/* dropdown on mobile devices */
//page init
bindReady(function(){
	initTouchNav();
});

// handle dropdowns on mobile devices
function initTouchNav() {
	lib.each(lib.queryElementsBySelector('#main-navigation-list'), function(){
		new TouchNav({
			navBlock: this,
			menuDrop: 'div.drop'
		});
	});
}

// navigation accesibility module
function TouchNav(opt) {
	this.options = {
		hoverClass: 'hover',
		menuItems: 'li',
		menuOpener: 'a',
		menuDrop: 'ul',
		navBlock: null
	};
	for(var p in opt) {
		if(opt.hasOwnProperty(p)) {
			this.options[p] = opt[p];
		}
	}
	this.init();
}
TouchNav.isActiveOn = function(elem) {
	return elem && elem.touchNavActive;
};
TouchNav.prototype = {
	init: function() {
		if(typeof this.options.navBlock === 'string') {
			this.menu = document.getElementById(this.options.navBlock);
		} else if(typeof this.options.navBlock === 'object') {
			this.menu = this.options.navBlock;
		}
		if(this.menu) {
			this.addEvents();
		}
	},
	addEvents: function() {
		// attach event handlers
		var self = this;
		var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
		this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

		for(var i = 0; i < this.menuItems.length; i++) {
			(function(i){
				var item = self.menuItems[i],
					currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
					currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

				// only for touch input devices
				if( (self.isTouchDevice || navigator.msPointerEnabled) && currentDrop && currentOpener) {
					lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
					lib.event.add(currentOpener, touchEvent, function(e){
						if( self.isTouchPointerEvent(e) ) {
							self.preventCurrentClick = false;
							return;
						}
						self.touchFlag = true;
						self.currentItem = item;
						self.currentLink = currentOpener;
						self.pressHandler.apply(self, arguments);
					});
				}
				// for desktop computers and touch devices
				lib.event.add(item, 'mouseover', function(){
					if(!self.touchFlag) {
						self.currentItem = item;
						self.mouseoverHandler();
					}
				});
				lib.event.add(item, 'mouseout', function(){
					if(!self.touchFlag) {
						self.currentItem = item;
						self.mouseoutHandler();
					}
				});
				item.touchNavActive = true;
			})(i);
		}

		// hide dropdowns when clicking outside navigation
		if(this.isTouchDevice || navigator.msPointerEnabled) {
			lib.event.add(document, touchEvent, lib.bind(this.clickOutsideHandler, this));
		}
	},
	mouseoverHandler: function() {
		lib.addClass(this.currentItem, this.options.hoverClass);
	},
	mouseoutHandler: function() {
		lib.removeClass(this.currentItem, this.options.hoverClass);
	},
	hideActiveDropdown: function() {
		for(var i = 0; i < this.menuItems.length; i++) {
			if(lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
				lib.removeClass(this.menuItems[i], this.options.hoverClass);
			}
		}
		this.activeParent = null;
	},
	pressHandler: function(e) {
		// hide previous drop (if active)
		if(this.currentItem !== this.activeParent) {
			if(this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
				lib.removeClass(this.activeParent, this.options.hoverClass);
			} else if(!this.isParent(this.activeParent, this.currentLink)) {
				this.hideActiveDropdown();
			}
		}
		// handle current drop
		this.activeParent = this.currentItem;
		if(lib.hasClass(this.currentItem, this.options.hoverClass)) {
			this.preventCurrentClick = false;
		} else {
			e.preventDefault();
			this.preventCurrentClick = true;
			lib.addClass(this.currentItem, this.options.hoverClass);
		}
	},
	clickHandler: function(e) {
		// prevent first click on link
		if(this.preventCurrentClick || typeof this.preventCurrentClick === 'undefined') {
			e.preventDefault();
		}
	},
	clickOutsideHandler: function(event) {
		if( this.isTouchPointerEvent(event) ) return;
		var e = event.changedTouches ? event.changedTouches[0] : event;
		if(this.activeParent && !this.isParent(this.menu, e.target)) {
			this.hideActiveDropdown();
			this.touchFlag = false;
		}
	},
	isParent: function(parent, child) {
		while(child.parentNode) {
			if(child.parentNode == parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	isTouchPointerEvent: function(e) {
		return (navigator.pointerEnabled && e.pointerType === 'touch') ||
				(navigator.msPointerEnabled && e.pointerType !== e.MSPOINTER_TYPE_TOUCH);
	},
	isTouchDevice: (function() {
		try {
			return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) || navigator.userAgent.indexOf('IEMobile') != -1;
		} catch (e) {
			return false;
		}
	}())
};

/*
 * Utility module
 */
lib = {
	hasClass: function(el,cls) {
		return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	},
	addClass: function(el,cls) {
		if (el && !this.hasClass(el,cls)) el.className += " "+cls;
	},
	removeClass: function(el,cls) {
		if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	},
	extend: function(obj) {
		for(var i = 1; i < arguments.length; i++) {
			for(var p in arguments[i]) {
				if(arguments[i].hasOwnProperty(p)) {
					obj[p] = arguments[i][p];
				}
			}
		}
		return obj;
	},
	each: function(obj, callback) {
		var property, len;
		if(typeof obj.length === 'number') {
			for(property = 0, len = obj.length; property < len; property++) {
				if(callback.call(obj[property], property, obj[property]) === false) {
					break;
				}
			}
		} else {
			for(property in obj) {
				if(obj.hasOwnProperty(property)) {
					if(callback.call(obj[property], property, obj[property]) === false) {
						break;
					}
				}
			}
		}
	},
	event: (function() {
		var fixEvent = function(e) {
			e = e || window.event;
			if(e.isFixed) return e; else e.isFixed = true;
			if(!e.target) e.target = e.srcElement;
			e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
			e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
			return e;
		};
		return {
			add: function(elem, event, handler) {
				if(!elem.events) {
					elem.events = {};
					elem.handle = function(e) {
						var ret, handlers = elem.events[e.type];
						e = fixEvent(e);
						for(var i = 0, len = handlers.length; i < len; i++) {
							if(handlers[i]) {
								ret = handlers[i].call(elem, e);
								if(ret === false) {
									e.preventDefault();
									e.stopPropagation();
								}
							}
						}
					};
				}
				if(!elem.events[event]) {
					elem.events[event] = [];
					if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
					else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
				}
				elem.events[event].push(handler);
			},
			remove: function(elem, event, handler) {
				var handlers = elem.events[event];
				for(var i = handlers.length - 1; i >= 0; i--) {
					if(handlers[i] === handler) {
						handlers.splice(i,1);
					}
				}
				if(!handlers.length) {
					delete elem.events[event];
					if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
					else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
				}
			}
		};
	}()),
	queryElementsBySelector: function(selector, scope) {
		scope = scope || document;
		if(!selector) return [];
		if(selector === '>*') return scope.children;
		if(typeof document.querySelectorAll === 'function') {
			return scope.querySelectorAll(selector);
		}
		var selectors = selector.split(',');
		var resultList = [];
		for(var s = 0; s < selectors.length; s++) {
			var currentContext = [scope || document];
			var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
			for (var i = 0; i < tokens.length; i++) {
				token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
				if (token.indexOf('#') > -1) {
					var bits = token.split('#'), tagName = bits[0], id = bits[1];
					var element = document.getElementById(id);
					if (element && tagName && element.nodeName.toLowerCase() != tagName) {
						return [];
					}
					currentContext = element ? [element] : [];
					continue;
				}
				if (token.indexOf('.') > -1) {
					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; j < elements.length; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
					if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
						attrName = 'htmlFor';
					}
					var found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; elements[j]; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0, checkFunction;
					switch (attrOperator) {
						case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
						case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
						case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
						case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
						case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
						case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
						default : checkFunction = function(e) { return e.getAttribute(attrName) };
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (checkFunction(found[k])) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				tagName = token;
				var found = [], foundCount = 0;
				for (var h = 0; h < currentContext.length; h++) {
					var elements = currentContext[h].getElementsByTagName(tagName);
					for (var j = 0; j < elements.length; j++) {
						found[foundCount++] = elements[j];
					}
				}
				currentContext = found;
			}
			resultList = [].concat(resultList,currentContext);
		}
		return resultList;
	},
	trim: function (str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	bind: function(f, scope, forceArgs){
		return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
	}
};

// DOM ready handler
function bindReady(handler){
	var called = false;
	var ready = function() {
		if (called) return;
		called = true;
		handler();
	};
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', ready, false);
	} else if (document.attachEvent) {
		if (document.documentElement.doScroll && window == window.top) {
			var tryScroll = function(){
				if (called) return;
				if (!document.body) return;
				try {
					document.documentElement.doScroll('left');
					ready();
				} catch(e) {
					setTimeout(tryScroll, 0);
				}
			};
			tryScroll();
		}
		document.attachEvent('onreadystatechange', function(){
			if (document.readyState === 'complete') {
				ready();
			}
		});
	}
	if (window.addEventListener) window.addEventListener('load', ready, false);
	else if (window.attachEvent) window.attachEvent('onload', ready);
}

window.diseases_list_by_organ =function (id){
    id=id.replace('-','_');
    var curent_organ=eval('organs_data.'+id);
    var html='';
    if(curent_organ&&curent_organ.diseases&&curent_organ.diseases.length){
        for(var i=0;i<curent_organ.diseases.length;i++){
            html+='<li><a target="_top" href="'+curent_organ.diseases[i].href+'">'+curent_organ.diseases[i].title+'</a></li>';
        }
    }
    jQuery('#diseases-list').html(html);
    jQuery('.body-popup .vscrollable').slimScroll({
        size: '5px',
        color: '#81c6e9',
        alwaysVisible: true,
        height: '580px'
    });
    return html;
}
var diseases_list_html=false;
jQuery(document).ready(function(){
    diseases_list_html=jQuery('#diseases-list').html();
});
window.diseases_list_html_restore=function(){
    jQuery('#diseases-list').html(diseases_list_html);
}
window.get_organ_title=function(id){
    id=id.replace('-','_');
    try{
        var curent_organ=eval('organs_data.'+id);
    }
    catch (e){
        var curent_organ=false;
    }
    if(curent_organ){
        return curent_organ.title;
    }
    return false;
}