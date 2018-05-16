var lastPrice = 0;

function updateData() {

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://api.gdax.com/products/eth-usd/ticker", true);

	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {

	    var resp = JSON.parse(xhr.responseText);

	    chrome.browserAction.setBadgeText({text:resp.price.substring(0,4)});

	    chrome.browserAction.setBadgeBackgroundColor({
	    	color : resp.price > lastPrice ? "green" : "red"
	    });

	    lastPrice = resp.price;
	  }
	}
	
	xhr.send();

	window.setTimeout(updateData, 1000 * 10);
}

updateData();