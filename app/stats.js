function Stats() {}

Stats.prototype.fetch = function(one, two, handler) {

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://api.gdax.com/products/" + one + "-" + two + "/stats", true);

	xhr.onreadystatechange = function() {

	  	if (xhr.readyState == 4) {

	    	var resp = JSON.parse(xhr.responseText);

	    	handler(resp.open, resp.high, resp.low, resp.volume);

		}
		
	};

	xhr.send();
}