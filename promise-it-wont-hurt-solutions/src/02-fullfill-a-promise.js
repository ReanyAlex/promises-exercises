/*
Create a promise. Have it fulfilled with a value of 'FULFILLED!' in
executor after a delay of 300ms, using setTimeout.

Then, print the contents of the promise after if has been fulfilled by passing
console.log to then.
*/


//Promise object constructor
var promise = new Promise(function(fulfill, reject) {
  //simulates delay to retrieve information
  setTimeout(function(){
      //fullfilled promise information
     fulfill("FULFILLED!");
   }, 300);
 });

//log the fullfilled promise
promise.then(function(content){
  console.log(content);
});

//arrow functions and let
// let promise = new Promise((resolve, reject) => {
//   setTimeout(function(){
//     resolve("FULFILLED!");
//   }, 300);
// });
//
// promise.then((message) =>{
//   console.log(message);
// });
