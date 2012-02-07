(function ($) {
    $.notify = function (message, options) {
		var bodyElement = $('body');
		
		var controller = bodyElement.data('jscom.NotifyController');
		if(controller == undefined || controller == null){
			controller = new NotifyController(options);
			bodyElement.data('jscom.NotifyController', controller);
		}
		
		controller.notify(message, options);
		
		return controller;
    };
	
	function NotifyController(options){
		// Helper elements & variables
		var bodyElement = $('body');
		var scope = this;
		
		/* Setup the settings & options */
		var defaults = { timeout: 4000, cssClass: 'default' };
        var settings = $.extend(
            { }, 
            defaults, 
            options
        );
		
		var notificationElement = bodyElement.find('#JSNotification');

		if(notificationElement == undefined || notificationElement.length <= 0){
			bodyElement.append('<div id="JSNotification"></div>');
			notificationElement = bodyElement.find('#JSNotification');
			notificationElement.html('<p></p><div class="progress"><!--progress--></div>');
		}		
		
		this.timeout = settings.timeout;
		this.cssClass = settings.cssClass;
		this.target = notificationElement;
		this.timer = null;
		this.timestamp = 0;
		
		this.target.hover(
			function() { $(this).addClass('mouse-over'); },
			function() { $(this).removeClass('mouse-over'); scope.onMouseOut(); }
		);
		
		this.target.every(1, 0, function(){
			scope.update();
		});
	};
	
	NotifyController.prototype.notify = function(message, options){
		var timestamp = new Date();
		
		/* Setup the settings & options */
		var defaults = { timeout: 4000, cssClass: 'default' };
        var settings = $.extend(
            { }, 
            defaults, 
            options
        );
		
		this.timeout = settings.timeout;
		this.cssClass = settings.cssClass;

		this.target.find('p').html(
			'<span class="datestamp">' + 
			timestamp.format("h:MM:ss TT").toString() + 
			'</span><span class="message">' + 
			message + 
			'</span>'
		)
		this.timestamp = timestamp;
		this.target.addClass('active').addClass(this.cssClass);
		
		
		var scope = this;
		this.timer = setTimeout(
			function() { scope.close(); }, 
			this.timeout
		);
	};
	
	NotifyController.prototype.update = function(){
		if(this.target.hasClass('mouse-over')){		
			this.timestamp = new Date();
			
			return;
		}
		
		var time = new Date();
		var delta = time - this.timestamp;
		
		var percent = (delta / this.timeout * 100).toFixed(0);
		if(percent > 100) percent = 100;
		
		this.target.find('.progress').css('width', percent.toString() + '%');
	};
	
	NotifyController.prototype.onMouseOut = function(){
		if(this.timer != undefined && this.timer != null){
			clearTimeout(this.timer);
			this.timer = null;
		}
		
		var scope = this;
		this.timer = setTimeout(
			function() { scope.close(); }, 
			this.timeout
		);
		
		this.timestamp = new Date();
	};
	
	NotifyController.prototype.close = function(){
		if(this.target.hasClass('mouse-over')){
			return;
		}
		
		this.target.removeClass('active').removeClass(this.cssClass);
	};
	
	/* EVERY CONTROLLER */
	$.fn.every = function(interval, pauseInterval, callback, id){
		if(id == undefined || id == null) { id = ''; }
		
		var controller = this.data('jscom.EveryController-' + id);
		
		if(controller == undefined || controller == null){
			controller = new EveryController(this, interval, pauseInterval, callback);
		
			this.data('jscom.EveryController-' + id, controller);
		}
		
		controller.init();
		
		return controller;
	};

	function EveryController(element, interval, pauseInterval, callback){
		this.element = element;
		this.interval = interval;
		this.pauseInterval = pauseInterval;
		this.callback = callback;
		
		this.timerId = null;
	}

	EveryController.prototype.init = function(){
		this.reset();
	}

	EveryController.prototype.reset = function(){
		// Clear the timer
		clearTimeout(this.timerId);
		
		var scope = this;
		
		// Wait for a bit...
		this.timerId = setTimeout(function() { scope.timeOut(); }, this.interval);
	}

	EveryController.prototype.timeOut = function () {
		// Reset the timer and perform the callback
		clearTimeout(this.timerId);
		if (this.callback) {
			this.callback();
		}

		// Setup the delay (adjust for animation)
		var scope = this;
		this.timerId = setTimeout(function () { scope.reset(); }, this.pauseInterval);
	}

})(jQuery);
