'use strict';
var mysql = require('mysql');
var util = require('util');


class Mysql{

constructor(){

 this.conn = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

}




Insert (quiz ,ans,img){


var sql  = util.format('insert into GeoData (Quiz,Ans,Image) VALUES("%s","%s","%s")',quiz,ans,img);
var connection = this.conn;
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

}



SelectAnswer(Quiz){

return new Promise((resolve,reject)=>{

var connection = this.conn;

connection.connect(function(err){
	try{
if (err) throw err;
var Query  = util.format("select Ans,Image from GeoData where Quiz='%s'",Quiz);

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

}//class end 
module.exports = Mysql;