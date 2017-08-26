'use strict';
var mysql = require('mysql');
const Restify = require('restify');
let curl      = require('curlrequest');
var wolf      = require('./WolframeSearch');
var Evi       = require('./EviSearch');
var util      = require('util');
//var mysql     =require('./mySqlClass');



function Insert (quiz ,ans,img){

return new Promise((resolve,reject)=>{
	
	

var connection =mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});
var sql  = util.format('Query',quiz,ans,img);

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



function SelectAnswer(Quiz){

return new Promise((resolve,reject)=>{

var connection =mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

connection.connect(function(err){
    try{
if (err) throw err;
var Query  = util.format("Query",Quiz);

connection.query(Query,function(err,result){

if (err) throw err;
if(result.length>0){
var res = JSON.stringify(result);
var resp = JSON.parse(res);

var answer = resp[0].Ans;
var Image = resp[0].Image;
if(typeof Image!='undefiend' && Image){
var response = {

    msg:answer,
    img:Image,

}
 resolve(response);
}else{

  var response = {
    msg:answer
}
resolve(response);
}
}else{

    resolve([]);
}

});

connection.end();
}catch(err){

reject(err);
}

});

});
}







const server  = Restify.createServer({

name : "GeoBot"

});


const PORT = process.env.PORT || 8070;
server.use(Restify.bodyParser());
server.use(Restify.jsonp());
var webdriver = require('selenium-webdriver'),
    By        = webdriver.By,
    until     = webdriver.until;



 server.post('/',(req,res,next)=>{

res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');

console.log(req.body.message);
var Q = req.body.message;
var sending =false;
 if((typeof Q=='string' && Q!==null) || Q!==''){


SelectAnswer(Q).then((response)=>{

if(response.length ==0){

console.log("no answer found");
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



}

});


 server.listen(PORT , ()=>console.log(`${server.name} is listening on ${PORT}  `));