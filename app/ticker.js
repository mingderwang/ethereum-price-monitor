function Ticker() {}

Ticker.prototype.fetch = function(one, two, handler) {

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://api.gdax.com/products/" + one + "-" + two + "/ticker", true);

	xhr.onreadystatechange = function() {

	  	if (xhr.readyState == 4) {

	    	var resp = JSON.parse(xhr.responseText);

	    	handler(resp.price);

		}
		
	};

	xhr.send();
}