document.addEventListener('DOMContentLoaded', function () {

	chrome.storage.sync.get(['currency'], function(data) {

		  var currency = data.currency || 'USD';

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
