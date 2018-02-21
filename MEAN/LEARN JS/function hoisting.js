/*Only function declaration gets hoisted to the top, not function expression*/


//Function declaration

foo();

function foo(){
    console.log('function declaration works');
}

//Function expression

bar();      //// TypeError: bar is not a function
var bar = function(){
    console.log('function expression does not');
};
