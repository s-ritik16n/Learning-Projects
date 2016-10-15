function say(value){
    console.log(value);
}

function exec(func,val){
    func(val);
}
exec(say,"hello");

//we can define and pass a function as a parameter to another function in-place:

function somef(func,val){
    func(val);
};

somef(function(val){
    console.log(val);
},"hello");