'use strict';

var str = "what is the population of china";

var str = str.replace(/\s/gi, function myFunction(x){
    return '+';});


console.log(str);