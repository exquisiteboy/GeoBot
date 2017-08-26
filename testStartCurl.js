'use strict';


let curl = require('curlrequest');

var Q = "what is the population of china";
var str = Q.replace(/\s/gi, function myFunction(x){
    return '+';});

var Url = 'http://start.csail.mit.edu/answer.php?query='+str;
let options = {
	url:Url
} // url, method, data, timeout,data, etc can be passed as options 
curl.request(options,(err,response)=>{


console.log(response);

});
