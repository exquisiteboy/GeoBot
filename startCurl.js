'use strict';

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;



module.exports.StartSearch =function (Q){

var str = Q.replace(/\s/gi, function myFunction(x){
    return '+';});

var URL = 'http://start.csail.mit.edu/answer.php?query='+str;

var driver = new webdriver.Builder()
   .forBrowser('chrome')
    .build();



driver.get(URL);
driver.findElement(webdriver.By.css('html body span span table tbody tr td div.category_data')).then((response)=>{
console.log(response);

for(var i=0;i<response.length;i++){
 response[i].then(function (res){

   console.log(res);

 } );


}


});






}