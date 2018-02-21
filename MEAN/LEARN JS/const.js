//You cannot declare a constant with the same name as a function or variable in the same scope. 

function f(){
    return;
}
const f = 4;    //TypeError: var 'f' has already been declared

function g(){
    const g = 6;
    console.log(g); //this works fine, because the scope of g is not same for function and const
}

function h(){
    const i = 7;   //TypeError: const 'i' has already been declared
    var i;
}

f();
g();
h();