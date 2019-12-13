/*bootstrap_tooltip_v3.0.3*/!function(y){"use strict";var n=function(t,e){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",t,e)};n.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},n.prototype.init=function(t,e,i){this.enabled=!0,this.type=t,this.$element=y(e),this.options=this.getOptions(i);for(var o=this.options.trigger.split(" "),n=o.length;n--;){var s=o[n];if("click"==s)this.$element.on("click."+this.type,this.options.selector,y.proxy(this.toggle,this));else if("manual"!=s){var r="hover"==s?"mouseenter":"focus",p="hover"==s?"mouseleave":"blur";this.$element.on(r+"."+this.type,this.options.selector,y.proxy(this.enter,this)),this.$element.on(p+"."+this.type,this.options.selector,y.proxy(this.leave,this))}}this.options.selector?this._options=y.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.getOptions=function(t){return(t=y.extend({},this.getDefaults(),this.$element.data(),t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},n.prototype.getDelegateOptions=function(){var i={},o=this.getDefaults();return this._options&&y.each(this._options,function(t,e){o[t]!=e&&(i[t]=e)}),i},n.prototype.enter=function(t){var e=t instanceof this.constructor?t:y(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);if(clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show();e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)},n.prototype.leave=function(t){var e=t instanceof this.constructor?t:y(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)},n.prototype.show=function(){var t=y.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(t),t.isDefaultPrevented())return;var e=this.tip();this.setContent(),this.options.animation&&e.addClass("fade");var i="function"==typeof this.options.placement?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,o=/\s?auto?\s?/i,n=o.test(i);n&&(i=i.replace(o,"")||"top"),e.detach().css({top:0,left:0,display:"block"}).addClass(i),this.options.container?e.appendTo(this.options.container):e.insertAfter(this.$element);var s=this.getPosition(),r=e[0].offsetWidth,p=e[0].offsetHeight;if(n){var h=this.$element.parent(),a=i,l=document.documentElement.scrollTop||document.body.scrollTop,f="body"==this.options.container?window.innerWidth:h.outerWidth(),c="body"==this.options.container?window.innerHeight:h.outerHeight(),u="body"==this.options.container?0:h.offset().left;i="bottom"==i&&s.top+s.height+p-l>c?"top":"top"==i&&s.top-l-p<0?"bottom":"right"==i&&s.right+r>f?"left":"left"==i&&s.left-r<u?"right":i,e.removeClass(a).addClass(i)}var d=this.getCalculatedOffset(i,s,r,p);this.applyPlacement(d,i),this.$element.trigger("shown.bs."+this.type)}},n.prototype.applyPlacement=function(t,e){var i,o=this.tip(),n=o[0].offsetWidth,s=o[0].offsetHeight,r=parseInt(o.css("margin-top"),10),p=parseInt(o.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(p)&&(p=0),t.top=t.top+r,t.left=t.left+p,o.offset(t).addClass("in");var h=o[0].offsetWidth,a=o[0].offsetHeight;if("top"==e&&a!=s&&(i=!0,t.top=t.top+s-a),/bottom|top/.test(e)){var l=0;t.left<0&&(l=-2*t.left,t.left=0,o.offset(t),h=o[0].offsetWidth,a=o[0].offsetHeight),this.replaceArrow(l-n+h,h,"left")}else this.replaceArrow(a-s,a,"top");i&&o.offset(t)},n.prototype.replaceArrow=function(t,e,i){this.arrow().css(i,t?50*(1-t/e)+"%":"")},n.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},n.prototype.hide=function(){var t=this,e=this.tip(),i=y.Event("hide.bs."+this.type);function o(){"in"!=t.hoverState&&e.detach()}if(this.$element.trigger(i),!i.isDefaultPrevented())return e.removeClass("in"),y.support.transition&&this.$tip.hasClass("fade")?e.one(y.support.transition.end,o).emulateTransitionEnd(150):o(),this.$element.trigger("hidden.bs."+this.type),this},n.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},n.prototype.hasContent=function(){return this.getTitle()},n.prototype.getPosition=function(){var t=this.$element[0];return y.extend({},"function"==typeof t.getBoundingClientRect?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())},n.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},n.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},n.prototype.tip=function(){return this.$tip=this.$tip||y(this.options.template)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},n.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},n.prototype.enable=function(){this.enabled=!0},n.prototype.disable=function(){this.enabled=!1},n.prototype.toggleEnabled=function(){this.enabled=!this.enabled},n.prototype.toggle=function(t){var e=t?y(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;e.tip().hasClass("in")?e.leave(e):e.enter(e)},n.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var t=y.fn.tooltip;y.fn.tooltip=function(o){return this.each(function(){var t=y(this),e=t.data("bs.tooltip"),i="object"==typeof o&&o;e||t.data("bs.tooltip",e=new n(this,i)),"string"==typeof o&&e[o]()})},y.fn.tooltip.Constructor=n,y.fn.tooltip.noConflict=function(){return y.fn.tooltip=t,this}}(jQuery);