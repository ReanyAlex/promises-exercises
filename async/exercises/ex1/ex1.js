function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way
//this is called each time we getFile
function getFile(file) {
	fakeAjax(file,function(text){
		//calls a function to handle the response from the AJAX
		handleResponse(file,text);
	});
}
//an object to hold information to see what has returned already
var responses = {};

function handleResponse(file,cont) {
	//Checks to see if the file exists in the holding object
	if (!(file in responses)) {
		//if it doesn't exist add it to the object
		responses[file] = cont;
	}
	//holds the order of the ways we want the files to display
	var fileOrder = ["file1","file2","file3"];
	//itterates over the array to check if all files are been retrieved
	for (var i = 0; i < fileOrder.length; i++) {
		//checks if the file has been added to response
		console.log(responses);
		if (fileOrder[i] in responses) {
			//makes sure to only display items that haven't already been displayed
			if (typeof responses[fileOrder[i]] == "string") {
				//function that just logs the argument
				output(responses[fileOrder[i]]);
				responses[fileOrder[i]] = false;
			}
		}
		else {
					return;
		}
	}
	//function that just logs the argument
	output("Complete");
}



// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
