(function ($) {
	"use strict";
	
	if(!$.js){
		$.js = {
			version: "1.0"
		};
	}
	
	$.fn.collapsible = function(options) {
		/* Setup the settings & options */
		var defaults = { 
			collapsibleSelector: '.collapsible',
			toggleSelector: 'a',
			callback: null
		};
		
		var settings = $.extend(
			{ }, 
			defaults, 
			options
		);
		
		this.find(settings.collapsibleSelector).addClass('collapsed').slideUp(0);
		
		return this.each(function() {
			var that = $(this),
				elements = that.find(settings.toggleSelector);
				
			elements.click(function(event) {
				event.preventDefault();
				
				var collapsibles = $(this).parent().find(settings.collapsibleSelector);
				
				collapsibles
					.toggleClass('collapsed')
					.each(function() {
						var collapsible = $(this);
						
						if(collapsible.hasClass('collapsed')) collapsible.slideUp(options.callback);
						else collapsible.slideDown(options.callback);
					});
			});
			
		});
	};
	
    $.js.notify = function (message, options) {
		
		var bodyElement = $('body');
		
		var controller = bodyElement.data('jscom.NotifyController');
		if (controller == null) {
			controller = new NotifyController(options);
			bodyElement.data('jscom.NotifyController', controller);
		}
		
		controller.notify(message, options);
		
		return controller;
    };
	
	function NotifyController(options) {
		// Helper elements & variables
		var bodyElement = $('body'),
			that = this;
		
		var notificationElement = bodyElement.find('#JSNotification');

		if (notificationElement == null || notificationElement.length <= 0) {
			bodyElement.append('<div id="JSNotification"></div>');
			notificationElement = bodyElement.find('#JSNotification');
			notificationElement.html('<p></p><div class="progress"><!--progress--></div>');
		}		

		this.updateSettings(options);

		this.target = notificationElement;
		this.timer = null;
		this.timestamp = 0;
		
		this.target.hover(
			function() { 
				$(this).addClass('mouse-over'); 
			},
			function() { 
				$(this).removeClass('mouse-over'); that.onMouseOut(); 
			}
		);
		
		this.target.every(1, 0, function() {
			that.update();
		});
	};
	
	NotifyController.prototype = {
	
		updateSettings: function(options) {
			/* Setup the settings & options */
			var defaults = { 
				timeout: 4000, 
				cssClass: 'default' 
			};
			
			var settings = $.extend(
				{ }, 
				defaults, 
				options
			);
			
			this.timeout = settings.timeout;
			this.cssClass = settings.cssClass;
		},
		
		notify: function(message, options) {
			if (this.timer != null) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.target.attr('class', '');
			this.updateSettings(options);
			
			var timestamp = new Date();

			this.target.find('p').html(
				'<span class="datestamp">' + 
				timestamp.format("h:MM:ss TT").toString() + 
				'</span><span class="message">' + 
				message + 
				'</span>'
			);
			this.timestamp = timestamp;
			this.target.addClass('active').addClass(this.cssClass);
			
			
			var that = this;
			this.timer = setTimeout(
				function() { 
					that.close(); 
				}, 
				this.timeout
			);
		},
	
		update: function() {
			if (this.target.hasClass('mouse-over')) {		
				this.timestamp = new Date();
				
				return;
			}
			
			var time = new Date();
			var delta = time - this.timestamp;
			
			var percent = (delta / this.timeout * 100).toFixed(0);
			if (percent > 100) {
				percent = 100;
			}
			
			this.target.find('.progress').css('width', percent.toString() + '%');
		},
	
		onMouseOut: function() {
			if (this.timer != null) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			
			var that = this;
			this.timer = setTimeout(
				function() { 
					that.close(); 
				}, 
				this.timeout
			);
			
			this.timestamp = new Date();
		},
	
		close: function() {
			if (this.target.hasClass('mouse-over')) {
				return;
			}
			
			this.target.removeClass('active'); //.removeClass(this.cssClass);
		}
	};
	
	/* EVERY CONTROLLER */
	$.fn.every = function(interval, pauseInterval, callback, id) {
		if (id == null) { 
			id = ''; 
		}
		
		var controller = this.data('jscom.EveryController-' + id);
		
		if (controller == null) {
			controller = new EveryController(this, interval, pauseInterval, callback);
		
			this.data('jscom.EveryController-' + id, controller);
		}
		
		controller.init();
		
		return controller;
	};

	function EveryController(element, interval, pauseInterval, callback) {
		this.element = element;
		this.interval = interval;
		this.pauseInterval = pauseInterval;
		this.callback = callback;
		
		this.timerId = null;
	}

	EveryController.prototype = {
		init: function() {
			this.reset();
		},

		reset: function() {
			// Clear the timer
			clearTimeout(this.timerId);
			
			var that = this;
			
			// Wait for a bit...
			this.timerId = setTimeout(function() { that.timeOut(); }, this.interval);
		},

		timeOut: function () {
			// Reset the timer and perform the callback
			clearTimeout(this.timerId);
			if (this.callback) {
				this.callback();
			}

			// Setup the delay (adjust for animation)
			var that = this;
			this.timerId = setTimeout(
				function () { 
					that.reset(); 
				},
				this.pauseInterval
			);
		}
	};

})(jQuery);
