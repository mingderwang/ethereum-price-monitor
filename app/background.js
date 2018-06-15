/**
 *
 *
 **/
 function BackgroundProcess() {

	var self = this;

	self.process = null;

	self.ticker = new Ticker("ETH","USD");
	self.stats = new Stats("ETH", "USD");

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

		self.stats.fetch("ETH", self.model.currency, function(open, high, low, volume) {

			self.ticker.fetch("ETH", self.model.currency, function(price) {

			    var badgePrice = parseFloat(price);

			    if( self.model.currency == "BTC" ) {
			    	badgePrice = badgePrice.toFixed(3).toString().substring(1,5) ;
			    } else {
			    	badgePrice = Math.round(badgePrice).toString();
			    }

				chrome.browserAction.setTitle({title: price.toString() });
			    chrome.browserAction.setBadgeText({
			    	text: badgePrice
			    });
			    chrome.browserAction.setBadgeBackgroundColor({
			    	color : price >= self.model.price ? "green" : "red"
			    });

			    if( parseInt(price) != parseInt(self.model.price) ) {

				    self.model.load(function() {
				    	self.model.price = price;
				    	self.model.stats = {
				    		open: open,
				    		volume: volume,
				    		high: high,
				    		low: low
				    	};
						self.model.save();
					});
				}

			});

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
