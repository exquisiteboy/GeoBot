'use strict';

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


module.exports.answerSearch =  function(Quiz){

return new Promise((resolve,reject)=>{
var str  = Quiz ;
var str  = str.replace(/\s/gi, function myFunction(x){
    return '_';});


var URL = "http://www.answers.com/Q/"+str;

var driver = new webdriver.Builder()
   .forBrowser('chrome')
    .build();
driver.get(URL);


driver.findElement(webdriver.By.className('answer_text')).getText().then((response)=>{
var Respo = response;
 
console.log(Respo);
resolve(Respo);

driver.quit();
 }).catch((err)=>{

reject(`Nothing Found about the Quiz ${Q=str}`);
console.log();
driver.quit();
 });

});


} 
