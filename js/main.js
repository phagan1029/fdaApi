function search(){
	// required api key
	var key = "7PcXD9iQU905xvCopWU8Nqkiy8GoiEnwpCQkcl5O";
	// store the users search term
	var term = document.getElementById("term");
	// element for results
	var results = document.getElementById("results");

		// clear HTML from the element with id="effects"
	results.innerHTML = "";

	// stop the function if no search term
	if (term.value == "") {
		results.innerHTML = "Please try another";
		return;
	}
	// ajax api request for data
	$.ajax({
		// call to api url with search term and a few extra properties
   	url: "https://api.fda.gov/drug/event.json?api_key="+ key + "&search=" + term.value + "&count=patient.reaction.reactionmeddrapt.exact",
		// expecting JSON data
		dataType: "json",
		// Getting data
		type: 'GET',
		// code to run when data is retrieved
   	success: function(data, err) {
			// console the current url and dat getting passed through
			// console.log(this.url, data);

   		for(var i = 0; i < 16; i++){
				// store side effect
    		var result = (data.results[i].term);

        if (result === "DRUG INEFFECTIVE") {
					// clear result if ineffective
					result = "";
        } else if (result === 0) {
					// no result from search term
          alert("Try another search");
        } else {
					// create element for result
					var el = document.createElement("div");
					// create text node for result
					var text = document.createTextNode(result);

					// add attributes to element
					el.className = "box";

					// add text to element
					el.appendChild(text);
					// add result to results
					results.appendChild(el);
        };
			};
	  }
	});
};

// add event to element with id="searchBtn"
document.getElementById("searchBtn").addEventListener('click', search, false);