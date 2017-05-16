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

function getFile(file) {
	// creates a new promise
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

//set the variable to the retrieved promise object
var prom1 = getFile("file1");
var prom2 = getFile("file2");
var prom3 = getFile("file3");

//call the information one after another in order
prom1
.then(output)
.then(function(){
	return prom2;
})
.then(output)
.then(function(){
	return prom3;
})
.then(output)
.then(function(){
	output("Complete")
})
.catch(function(err){
	output(err)
})
