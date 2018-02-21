console.log(x===undefined);
var x = 3;

var myvar = 'hi';

(function(){
    console.log(myvar);
    var myvar = 'there';
})();


/**
 * the above snippet is interpreted the same as:
 
var x;
console.log(x === undefined); // true
x = 3;
 

var myvar = "my value";
 
(function() {
  var myvar;
  console.log(myvar); // undefined
  myvar = "local value";
})();

*/