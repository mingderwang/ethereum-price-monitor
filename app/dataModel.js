function Model() {
	this.frequency = 30;
	this.currency = "USD";
	this.stats = {};
	this.price = 0;
}

Model.prototype.onChange = function(callback) {

	var self = this;

	chrome.storage.onChanged.addListener(function(data) {
		for(key in data) {
			self[key] = data[key].newValue || self[key];
			if( callback ) {
				callback(key, data[key].newValue, data[key].oldValue);
			}
		};
	});
}

Model.prototype.load = function(callback) {

	var self = this;

 	chrome.storage.sync.get([
 		'frequency',
 		'currency',
 		'price',
 		'stats'
 		], function(data) {
		self.frequency = data.frequency || self.frequency;
		self.currency = data.currency || self.currency;
		self.price = data.price || self.price;
		self.stats = data.stats || self.stats;
		if(callback) { callback(); }
	});
}

Model.prototype.save = function(callback) {

	var self = this;

	chrome.storage.sync.set({
		'frequency': self.frequency,
		'currency' : self.currency,
		'price' : self.price,
		'stats' : self.stats
	});

	if(callback) { callback(); }
}