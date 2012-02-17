/*
	jscom.mapper.js
	Copyright (C)2012 John Sedlak
	http://github.com/jsedlak/jsMetro (Source, Readme & Licensing)
*/
(function ($) {
	"use strict";
	
	if(!$.js){
		$.js = {
			mapperVersion: '1.2.3',
			author: 'John Sedlak (kriscsc@msn.com)',
			authorWebsite: 'http://johnsedlak.com',
			website: 'https://github.com/jsedlak/jsMetro'
		}; 
	}
	
	$.js.map = function(element, data, options) {
		/* Internal mapping function */
		var mapInternal = function(element, data) {
			for (var key in data) {
				var mappedElement = element.find('>*[data-key="' + key + '"]'),
					children = mappedElement.children();
				
				if (mappedElement == null || mappedElement.length <= 0) {
					return;
				}
				
				if (children.length > 0){
					mapInternal(mappedElement, data[key]);
				}
				else {
					mappedElement.html(data[key]);
				}
			}
		};
		
		/* Setup the settings & options */
		var defaults = { 
			clone: false 
		};
		
		var settings = $.extend (
			{ }, 
			defaults, 
			options
		);
		
		if (settings.clone) {
			var clonedElement = element.clone(true, true);
			
			mapInternal(clonedElement, data);
			
			return clonedElement;
		}
		else {
			mapInternal(element, data);
		}
		
		/* If not cloning, just return the element we affected */
		return element;
	};
	
	$.js.countProperties = function() {
		var sum = 0;
		for (var key in this) {
			sum++;
		}
		
		return sum;
	};
	
})(jQuery);