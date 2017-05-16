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
//active thunk generator
function getFile(file) {
	var text;
	var fn;

	fakeAjax(file,function(res){
		if (fn) {
				fn(res)
		}else {
			text = res;
		}
	});

	//return this callback for the thunks
	return function(cb) {
		//if the information has arrived return the cb function
		if (text) {
				cb(text)
		//if not then set fn to cb I think it is undefined
		}else {
			fn = cb;
		}
	};
}

// generate the thunks before you need to display them
var thunk1 = getFile("file1")
var thunk2 = getFile("file2")
var thunk3 = getFile("file3")

//won't display the inner nest until the outer nest gets the neccessary arguments
thunk1(function(text1) {
	output(text1);
	thunk2(function(text2) {
		output(text2);
		thunk3(function(text3){
			output(text3);
			output("completed");
		})
	})
})
