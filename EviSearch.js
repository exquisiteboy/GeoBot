'use strict';

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;




module.exports.EviSearch = function(Query){

return new Promise((resolve,reject)=>{

var Q = Query;
var URL = "https://www.evi.com/q/"+Q;

var driver = new webdriver.Builder()
   .forBrowser('firefox')
    .build();
driver.get(URL);


driver.findElement(webdriver.By.xpath('/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div/div[2]/li/div/div[1]')).getText().then((response)=>{
var Respo = response;

driver.findElement(webdriver.By.xpath('/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div/div[2]/li/figure/span/img')).getAttribute('src').then((Res)=>{
console.log(Res);

var message = Respo;
var imge    = Res;
var ImagJson = {

   msg:message,
   img:imge,

} 
resolve(ImagJson);
driver.quit();
}).catch((error)=>{
var response = {

	msg:Respo,
}
resolve(response);
driver.quit();
});


}).catch((err)=>{

reject("no element Found");

driver.quit();
});

});

}

