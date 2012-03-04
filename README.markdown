# jsMetro ReadMe

jsMetro ([jsmetro.johnsedlak.com](http://jsmetro.johnsedlak.com)) is a set of jQuery/js functions created with a goal of bringing Metro design elements to the web. The secondary goal is to learn about jQuery plugin and general javascript development.

## Releases

* Latest - [jsMetro 1.2.6](https://github.com/downloads/jsedlak/jsMetro/jsMetro-1.2.6.zip)

## Getting Started

The easiest way to get started is to view the samples at [jsmetro.johnsedlak.com](http://jsmetro.johnsedlak.com) which is a live version of the master branch. The jsMetro Framework includes **Notify**, **Dialog**, **Collapsible**, **ScrollTo**, **Map** and some associated HTML/CSS tools & styles.

### Notify

Notify ($.js.notify) is a simple function that creates a WP7-like Notification at the top of the browser window.

    $.js.notify('hello, world');

### Dialog

Dialog (WIP) ($.js.dialog) creates a modal dialog with programmable options and content.

**Simple**

    $.js.dialog('<h3>The Dialog Title</h3><p>Hello, world!</p>');

**Queueing**

Dialog supports queuing automatically. Supply more than one message at a time and it will display them in sequence.

    $.js.dialog('<h3>The Dialog Title</h3><p>Hello, world!</p>');
    $.js.dialog('<h3>The Dialog Title</h3><p>Hello, world! The sequel!</p>');

**Dialog Options**

You can, of course, supply your own custom buttons for the dialog and have methods called when one of this buttons is clicked.
    
    var cancelCallback = function(controller, button, event) {
    	$.js.dialog('Cancel was clicked!');
    };
    
    var continueCallback = function(c, b, e) {
    	$.js.dialog('Continue was clicked!');
    };
    
    
    $('#BasicDialog').click(function(event) {
    	event.preventDefault();
    	
    	$.js.dialog(
    		'<h3>Callbacks Sample</h3><p>Would you like to continue?</p>',
    		{
    			buttons: [ 'Cancel', 'Continue' ],
    			buttonClasses: [ 'previous icon', 'next icon' ],
    			callbacks: [ cancelCallback, continueCallback ]
    		}
    	);
    });

### Collapsible

The Collapsible function ($.fn.collapsible) collapses elements and allows users to toggle visibility via a second element.

**HTML**

    <div class="collapsible-wrapper">
        <p><a href="#" class="toggle button">[+] Expand</a></p>
        <pre class="collapsible">sample block
        </pre>
    </div>
	
**jQuery**

    $('.collapsible-wrapper').collapsible({
        toggleSelector: 'a.toggle',
        hidden: function(parent, toggle) {
            if (toggle.data('hidden-text')) {
                toggle.html(toggle.data('hidden-text'));
            } else {
                toggle.html('[+] View Demo');
            }
        },
        visible: function(parent, toggle) { 
            if (toggle.data('visible-text')) {
                toggle.html(toggle.data('visible-text'));
            } else {
                toggle.html('[-] Hide Demo');
            }
        }
    });

### ScrollTo

ScrollTo ($.fn.scrollTo) provides smoothly animated scrolling to any element. The sample uses this for the main navigation.

    $('#Page>header ul a').click(function(event) {
    	event.preventDefault();
    	
    	var that = $(this);
    	var scrollDestination = $('a[name="' + that.attr('href').substr(1) + '"]');
    	
    	if (window.history && window.history.pushState) {
    		window.history.pushState('', scrollDestination.html() + ' - jsMetro Demos', that.attr('href'))
    	}
    	
    	scrollDestination.scrollTo();
    });

### Map

Map ($.js.map) is a basic data-to-DOM mapping function to help populate the DOM with JSON data.

## Contributing

If you want to help/contribute, I am looking for complete Metro widgets and the like that follow the specs & guidelines set forth by the existing js files. In the future I will update this with a stricter set of guidelines.