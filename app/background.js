/**
 *
 *
 **/
 function BackgroundProcess() {

	var self = this;

	self.process = null;

	self.ticker = new Ticker("ETH","USD");

	self.model = new Model();
	self.model.onChange(function(prop, oldVal, newVal) {
		if( prop == "frequency" || 
			prop == "currency" ) {
			self.update(); 
		}
	});

	self.model.load();

	return this;
}

/**
 *
 *
 **/
BackgroundProcess.prototype.update = function() {

	var self = this;

	try {

		if(self.process) { clearTimeout(self.process); }

		self.ticker.fetch("ETH", self.model.currency, function(price) {

			chrome.browserAction.setTitle({title: price.toString() });
		    chrome.browserAction.setBadgeText({text:Math.round(parseFloat(price)).toString()});
		    chrome.browserAction.setBadgeBackgroundColor({
		    	color : price >= self.model.price ? "green" : "red"
		    });

		    if( parseInt(price) != parseInt(self.model.price) ) {

			    self.model.load(function() {
					self.model.price = price;
					self.model.save();
				});
			}

		});

	} finally {

		self.process = window.setTimeout( 
			function() { 
				self.update(); 
			}, 1000 * parseInt(self.model.frequency)
		);
	}
}

/**
 *
 *
 **/
var backgroundProcess = new BackgroundProcess();
	backgroundProcess.update();
