/*!
    * jQuery UI AriaTabs (31.01.11)
    * http://github.com/fnagel/jQuery-Accessible-RIA
    *
    * Copyright (c) 2009 Felix Nagel for Namics (Deustchland) GmbH
    * Copyright (c) 2010-2011 Felix Nagel
    * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
    *
    * Depends: jQuery UI
    *   		jQuery UI Tabs
    * Optional: jQuery Address Plugin
    */
define(["jquery","jqueryui"],function(a){(function(a){a.fn.extend(a.ui.tabs.prototype,{_create:function(){var b=this,c=this.options;if(a.address){var d={enable:!0,title:{enable:!0,split:" | "}};a.isEmptyObject(c.jqAddress)?c.jqAddress={}:a.extend(!0,d,c.jqAddress),a.extend(!0,c.jqAddress,d)}if(a.address&&c.jqAddress.enable)var e="#"+a.address.value().replace("/","");b._tabify(!0),this.anchors.bind(c.event+".tabs-accessibility",function(){this.focus()}),b.list.attr("role","tablist");for(x=0;x<b.anchors.length;x++)a.address&&c.jqAddress.enable&&e!="#"&&a(b.anchors[x]).attr("href")==e&&b.select(x),b._ariaInit(x);b.list.keydown(function(d){var e=!1;switch(d.keyCode){case a.ui.keyCode.RIGHT:b.select(c.selected+1);break;case a.ui.keyCode.DOWN:b.select(c.selected+1),e=!0;break;case a.ui.keyCode.UP:b.select(c.selected-1);break;case a.ui.keyCode.LEFT:b.select(c.selected-1);break;case a.ui.keyCode.END:b.select(b.anchors.length-1);break;case a.ui.keyCode.HOME:b.select(0)}return e}),a.address&&this.options.jqAddress.enable&&a.address.externalChange(function(c){var d="#"+c.value.replace("/",""),e=0;while(e<b.anchors.length){if(a(b.anchors[e]).attr("href")==d){b.select(e);return}e++}}),b.initiated=!0},_original_load:a.ui.tabs.prototype.load,load:function(b){a.address&&this.options.jqAddress.enable&&(a(this.anchors[0]).attr("aria-selected")!==undefined?(this.options.forceFirst===0&&b!==0&&(a.address.value()==""&&a.address.history(!1),a.address.value(a(this.anchors[0]).attr("href").replace(/^#/,"")),a.address.history(!0),this.options.forceFirst=!1),this.options.jqAddress.title.enable&&a.address.title(a.address.title().split(this.options.jqAddress.title.split)[0]+this.options.jqAddress.title.split+a(this.anchors[b]).text()),a.address.value(a(this.anchors[b]).attr("href").replace(/^#/,""))):this.options.forceFirst=b);for(x=0;x<this.anchors.length;x++)this._ariaSet(x,!1),a.data(this.anchors[x],"href.tabs")&&a(this.panels[x]).removeAttr("aria-live").removeAttr("aria-busy");a.data(this.anchors[b],"href.tabs")&&a(this.panels[b]).attr("aria-live","polite").attr("aria-busy","true"),this._original_load(b),a.data(this.anchors[b],"href.tabs")&&a(this.panels[b]).attr("aria-busy","false"),this._ariaSet(b,!0)},_ariaSet:function(b,c){var d=c?0:-1,e=a(this.anchors[b]);e.attr("tabindex",d).attr("aria-selected",c),c?!a.browser.msie&&this.initiated&&e.focus():e.closest("li").removeClass("ui-state-focus"),a(this.panels[b]).attr("aria-hidden",!c).attr("aria-expanded",c),a.browser.msie&&this.initiated&&(this.options.timeout=window.setTimeout(function(){e.focus()},100)),c&&this._updateVirtualBuffer()},_ariaInit:function(b){var c=this,d=a(this.panels[b]).attr("id");a(this.anchors[b]).attr("aria-controls",d).attr("id",d+"-tab").parent().attr("role","tab"),a(this.panels[b]).attr("role","tabpanel").attr("tabindex",0).attr("aria-labelledby",d+"-tab"),this.options.collapsible&&a(this.anchors[b]).bind(this.options.event,function(d){c._ariaSet(b,!a(c.panels[b]).hasClass("ui-tabs-hide"))})},_original_add:a.ui.tabs.prototype.add,add:function(a,b,c){this._original_add(a,b,c),this.element.attr("aria-live","polite").attr("aria-relevant","additions"),c?(this._ariaInit(c),this._ariaSet(c,!1)):(this._ariaInit(this.anchors.length-1),this._ariaSet(this.anchors.length-1,!1))},_original_remove:a.ui.tabs.prototype.remove,remove:function(a){this._original_remove(a),this.element.attr("aria-live","polite").attr("aria-relevant","removals")},_original_destroy:a.ui.tabs.prototype.destroy,destroy:function(){var b=this,c=this.options;b.element.removeAttr("role").removeAttr("aria-live").removeAttr("aria-relevant"),b.list.removeAttr("role");for(x=0;x<b.anchors.length;x++)a(b.anchors[x]).removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("role").removeAttr("id").removeAttr("tabindex").parent().removeAttr("role"),a(b.panels[x]).removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("aria-labelledby").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-relevant").removeAttr("role");a("body>form #virtualBufferForm").parent().remove(),this._original_destroy()},_updateVirtualBuffer:function(){var b=a("body>form #virtualBufferForm");b.length?(b.val()=="1"?b.val("0"):b.val("1"),b.hasClass("ui-accessibility-odd")?b.addClass("ui-accessibility-even").removeClass("ui-accessibility-odd"):b.addClass("ui-accessibility-odd").removeClass("ui-accessibility-even")):a("body").append('<form><input id="virtualBufferForm" type="hidden" value="1" /></form>')}}),a.fn.extend(a.ui.tabs.prototype,{_ariaSet:function(b,c){var d=c?0:-1,e=a(this.anchors[b]);e.attr("tabindex",d).attr("aria-selected",c),c||e.closest("li").removeClass("ui-state-focus"),a(this.panels[b]).attr("aria-hidden",!c).attr("aria-expanded",c),c&&this._updateVirtualBuffer()}})})(jQuery)})