'use strict'; 
require('events').EventEmitter.prototype._maxListeners = 100;
var mysql = require('mysql');
var util  = require('util');
let curl  = require('curlrequest');
var wolf  = require('./WolframeSearch');
var Evi   = require('./EviSearch');
var webdriver = require('selenium-webdriver'),
    By        = webdriver.By,
    until     = webdriver.until;

function Insert (quiz ,ans,img){

return new Promise((resolve,reject)=>{
var connection =mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "NodeJS"
});
var sql  = util.format('insert into GeoData (Quiz,Ans,Image) VALUES("%s","%s","%s")',quiz,ans,img);

connection.connect(function(err){
try{
if (err)throw err;
console.log("Connected");
connection.query(sql,function(err,result){
if (err) throw err;
//console.log(result.affectedRows);
resolve("number of records added :"+result.affectedRows);
});

connection.end();

}catch(err){

console.log(ex);
reject("duplicate entry for primary key");

}

});

});
}


var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Questions.txt')
});

lineReader.on('line', function (line) {
  //console.log('Line from file:', line);
var Q = line;

if(line.length !==0){
Evi.EviSearch(Q).then((response)=>{
    

    if (sending ==false){
        res.json(response);
        console.log("Evi response"+response);
        var Ans = response.msg;
        var imge = response.img;

        if(typeof imge!='undefiend' && imge){

            Insert(Q,Ans,imge);
        }else{

            Insert(Q,Ans,"");
        }



        sending=true;
    }
}).catch((err)=>{

console.log(err);
console.log('calling Wolf');
wolf.WolframeSearch(Q).then((response)=>{
    if(sending==false){
        res.json({
            msg:response,
        });

   Insert(Q,response,"");
        sending=true;
    }
       

}).catch((err)=>{

   console.log(err);
res.json({
    msg:"sorry i don't know the answer yet",

});

});




});


}
else{

if (sending ==false){
    setTimeout(function() {
    res.json(response);
     }, 4000);
        
        sending=true;
    }
}

});