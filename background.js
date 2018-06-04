var lastPrice = 0;
var frequency = 5;

chrome.storage.sync.get(['frequency'], function(data) {
	var frequency = data.frequency  || 5;
});

function updatePrice() {

	chrome.storage.sync.get(['currency'], function(data) {

			var currency = data.currency || 'USD';

			var xhr = new XMLHttpRequest();

			xhr.open("GET", "https://api.gdax.com/products/eth-" + currency.toLowerCase() + "/ticker", true);

			xhr.onreadystatechange = function() {
			  if (xhr.readyState == 4) {

			    var resp = JSON.parse(xhr.responseText);

			    chrome.browserAction.setTitle({title: resp.price });

			    price = parseFloat(resp.price);

			    price_rounded = Math.round(price);

			    chrome.browserAction.setBadgeText({text:price_rounded.toString()});

			    chrome.browserAction.setBadgeBackgroundColor({
			    	color : resp.price >= lastPrice ? "green" : "red"
			    });

			    lastPrice = resp.price;
			    chrome.storage.sync.set({'price': lastPrice}, function(data) {});

			  }
			}
			
			xhr.send();
	});
}

function updateData() {

	try { updatePrice(); } catch(e) {}

	window.setTimeout(updateData, 1000 * frequency);

	//chrome.storage.sync.onChange(updatePrice);
}

updateData();
