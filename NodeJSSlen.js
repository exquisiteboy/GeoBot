'use strict';
const Restify = require('restify');
let curl      = require('curlrequest');
const server  = Restify.createServer({

name : "GeoBot"

});


const PORT = process.env.PORT || 8070;
server.use(Restify.bodyParser());
server.use(Restify.jsonp());
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//var driver = new webdriver.Builder()
  //  .forBrowser('firefox')
   // .build();






server.post('/',(req,res,next)=>{

res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');

//console.log(req.body);

var Q = req.body.message;
 if((typeof Q=='string' && Q!==null) || Q!==''){

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
res.json({

	msg:message,
	img:imge,
});

}).catch((error)=>{

console.log(error);
res.json({

msg:Respo,

});

});


}).catch((err)=>{

console.log("no element Found");




res.json({

msg:'i dont know yet',

});




});



driver.quit();

}
//console.log(URL);


});




/*driver.get(URL);
var se =driver.findElement(webdriver.By.xpath('/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div/div[2]/li/div/div[1]')).getText().then((response)=>{


console.log(response);

if(response ===''){


}

}).catch((err)=>{

console.log(err);

});


driver.findElement(webdriver.By.xpath('/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div/div[2]/li/figure/span/img')).getAttribute('src').then((response)=>{


console.log('response');


}).catch((err)=>{

console.log("err"+err);

});


//driver.findElement(By.name('btnG')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//driver.quit();
*/

server.listen(PORT , ()=>console.log(`${server.name} is listening on ${PORT}  `));