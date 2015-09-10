/*!
 * Slideshow Tabs
 *
 * Copyright (c) 2010 Dylan Harrington
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Depends:
 *    ui.core.js 1.8.x
 *    ui.tabs.js
 *
 * Examples:
 *     Note: All examples assume var $tabs = $("#yourtabs").tabs(); has run
 *
 *     Defaults - 3.0s normal interval and 4.5s resume interval
 *     $tabs.tabs("slideshow");
 * 
 *     Custom normal interval - 5.0s normal interval and 7.5s resume interval
 *     $tabs.tabs("slideshow", 5000);
 *
 *     Custom normal and resume interval - 5.0s normal interval and 10.0s resume interval
 *     $tabs.tabs("slideshow", 5000, 10000);
 *
 *     Stop slideshow functionality and remove events (while keeping basic tab functionality)
 *     $tabs.tabs("slideshow", 0);
 *
 * TODO:
 *    Make sure default jQueryUI Tabs' disable and destroy functionality unbinds
 *    all Slideshow Tabs related events.
*/
define(["jquery","jqueryui","plugins/ui.ariaTabs","plugins/ui.ariaNoFocus"],function(a){a.ui.tabs.prototype.slideshow=function(b,c){var d=this,e,f,g;if(b===0){this.element.unbind("slideshow"),this.element.tabs("rotate",0);return}b=b||3e3,c=c||b*1.5,e=c>b?c-b:b,this.element.bind({"mouseenter.slideshow":function(a){a.preventDefault(),clearTimeout(f),d.element.tabs("rotate",0)},"mouseleave.slideshow":function(a){a.preventDefault(),f=setTimeout(function(){d.element.tabs("rotate",b,!0)},e)},"tabsshow.slideshow":function(b,c){var d=a(c.panel).fadeIn();typeof g!="undefined"&&g.fadeOut(),g=d}}),d.panels.not(":eq("+d.options.selected+")").hide().removeClass("visually-hidden"),this.element.tabs("rotate",b,!0)}})