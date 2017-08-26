'use strict';

let curl = require('curlrequest');

module.exports.WolframeSearch = function(query){

return new Promise((resolve,reject)=>{
var input= query;
var Url = "https://api.wolframalpha.com/v2/query?input="+encodeURIComponent(input)+"&format=image,plaintext&output=JSON&appid=4Q3HGE-89AWX3JEKA";
let options = {
	url:Url
} // url, method, data, timeout,data, etc can be passed as options 
curl.request(options,(err,response)=>{

if (!err){

//console.log(response);

var rsp= JSON.parse(response);
var success = rsp.queryresult.success;

if(success){

var pods =rsp.queryresult.pods;

var subpods1 = pods[1].subpods;
//console.log(subpods1);
var answer   = subpods1[0].plaintext; 
//console.log(answer);
if(typeof answer!=='undefined' && answer && answer!=='(data not available)'){
	resolve(answer);
}

}else if(rsp.queryresult.success==false){

reject("Nothing Found");

}

}

});

});



}

