var argv = require('yargs').usage("Usage: nodejs $0 --l= [num] --b= [num]").demand('l','b').argv;

var rect = require('./mod');

function solveRect(l,b){
    console.log("Solving for l = "+l+" and b = "+b+": ");
    rect(l,b,function(err,rectangle){
        if(err)
            console.log(err);
        else{
            console.log("Area = "+rectangle.area());
            console.log("Perimeter = "+rectangle.perimeter());
        }
    });
}

solveRect(argv.l,argv.b);