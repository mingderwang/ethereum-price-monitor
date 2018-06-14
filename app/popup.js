/**
 *
 *
 **/
 function PopupPage() {

 	var self = this;

 	self.model = new Model();
	self.model.onChange(function(prop) {
		if( prop == "price" ) { 
			self.updateView(); 
		}
	});

	self.model.load(function() {

	 	self.controls = {
	 		btnCurrency : {
	 			USD : document.getElementById('ctrl_currencyUSD'),
	 			EUR : document.getElementById('ctrl_currencyEUR'),
	 			BTC : document.getElementById('ctrl_currencyBTC')
	 		},
	 		rngFrequency : document.getElementById("ctrl_frequency"),
	 		txtFrequency : document.getElementById("text_frequency"),
	 		icnCurrency : document.getElementById("icon_currency"),
	 		txtCurrency : document.getElementById("text_currency"),
	 		txtPrice : document.getElementById("text_price")
	 	};

	 	var onCurrencyChange = function(Event) {
			self.model.load( function() {
		 		self.model.currency = 
		 			document.querySelector(
				    	'input[name="ctrl_currency"]:checked'
				    ).value
				self.model.save();
				self.updateView();
			});
	 	}

	 	self.controls.btnCurrency.USD.onclick = onCurrencyChange;
	 	self.controls.btnCurrency.EUR.onclick = onCurrencyChange;
	 	self.controls.btnCurrency.BTC.onclick = onCurrencyChange;
		
		self.controls.rngFrequency.onchange = function(Event) {
			self.model.load( function() {
				self.model.frequency = Event.target.value;
				self.model.save();
				self.updateView();
			});
		}

		var links = document.getElementsByTagName("a");

	    for (var i = 0; i < links.length; i++) {
	        (function () {
	            var ln = links[i];
	            var location = ln.href;
	            ln.onclick = function () {
	                chrome.tabs.create({active: true, url: location});
	            };
	        })();
	    }
	});

	return self;
}

/**
 *
 *
 **/
PopupPage.prototype.updateView = function() {

	var self = this;

	self.model.load(function() {
		self.controls.txtPrice.innerHTML = Math.round(self.model.price);
		self.controls.icnCurrency.className = "fa fa-" + self.model.currency.toLowerCase();
		self.controls.rngFrequency.value = self.model.frequency;
		self.controls.txtFrequency.innerHTML = self.model.frequency + " Secs";
		self.controls.btnCurrency.USD.checked = false;
		self.controls.btnCurrency.EUR.checked = false;
		self.controls.btnCurrency.BTC.checked = false;
		self.controls.btnCurrency.USD.parentNode.classList.remove("active");
		self.controls.btnCurrency.EUR.parentNode.classList.remove("active");
		self.controls.btnCurrency.BTC.parentNode.classList.remove("active");
		self.controls.btnCurrency[self.model.currency].checked = true;
		self.controls.btnCurrency[self.model.currency].parentNode.classList.add("active");
	});

	return this;
}


/**
 *
 *
 **/
document.addEventListener('DOMContentLoaded', function () {
	var popupPage = new PopupPage();
		popupPage.updateView();
});
