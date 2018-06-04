function updateUI(){
	var bgPage = chrome.extension.getBackgroundPage();
	chrome.storage.sync.set({'frequency': document.getElementById("placeholder_frequency").value });
	document.getElementById('btnApply').onclick = bgPage.updateData;
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {

	document.getElementById('btnApply').addEventListener('click', updateUI);

	chrome.storage.sync.get(['price'], function(data) {
		stored_price = data.price;
		document.getElementById("placeholder_price").innerHTML = Math.round(stored_price);
	});


	chrome.storage.sync.get(['frequency'], function(data) {
		var frequency = data.frequency || '5';
		document.getElementById("placeholder_frequency").value = frequency;

	});

	chrome.storage.sync.get(['currency'], function(data) {

		  var currency = data.currency || 'USD';
		  document.getElementById("placeholder_currency").innerHTML = currency;

		  var radio = document.getElementById('currency' + currency.toUpperCase()).checked = true;

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

		    var radios = document.getElementsByTagName("input");

		    for (i = 0; i < radios.length; i++) {
		    	(function () {
		    			var rad = radios[i];
			    		rad.onclick = function() {
			    			 chrome.storage.sync.set({
							    currency: document.querySelector(
							    	'input[name="currency"]:checked'
							    ).value
							 });
			    		}
		        })();
		    }

	});

});
