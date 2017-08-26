'use strict';

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var str ="who is the army chief of pakistan army" ;
var str  = str.replace(/\s/gi, function myFunction(x){
    return '_';});

var Q = str;

var URL = "http://www.answers.com/Q/"+Q;

var driver = new webdriver.Builder()
   .forBrowser('firefox')
    .build();
driver.get(URL);


driver.findElement(webdriver.By.className('answer_text')).getText().then((response)=>{
var Respo = response;
 
console.log(Respo);

driver.quit();
 }).catch((err)=>{

console.log(`Nothing Found about the Quiz ${Q}`);
driver.quit();
 });