var lastPrice = 0;


function updatePrice() {

	chrome.storage.sync.get(['currency'], function(data) {

			var currency = data.currency || 'USD';

			var xhr = new XMLHttpRequest();

			xhr.open("GET", "https://api.gdax.com/products/eth-" + currency.toLowerCase() + "/ticker", true);

			xhr.onreadystatechange = function() {
			  if (xhr.readyState == 4) {

			    var resp = JSON.parse(xhr.responseText);

			    chrome.browserAction.setTitle({title: resp.price });

			    chrome.browserAction.setBadgeText({text:resp.price.substring(0,4)});

			    chrome.browserAction.setBadgeBackgroundColor({
			    	color : resp.price >= lastPrice ? "green" : "red"
			    });

			    lastPrice = resp.price;
			  }
			}
			
			xhr.send();
	});
}

function updateData() {

	try { updatePrice(); } catch(e) {}

	window.setTimeout(updateData, 1000 * 5);


	chrome.storage.sync.onChange(updatePrice);
}

updateData();

