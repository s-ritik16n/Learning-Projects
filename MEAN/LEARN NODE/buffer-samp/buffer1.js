var buf = new Buffer('Hello world');    //this creates utf8 endoded buffer

/*
You can also create a buffer from strings with other encodings as long as you specify the encoding
on the second argument of the constructor:
*/
var buf64 = new Buffer('Hello world','base64');
var bufascii = new Buffer('hello world','ascii');
var buffutf8 = new Buffer('hello world','utf8');

console.log(buf);
console.log(buf64);
console.log(bufascii);
console.log(buffutf8);

/*
If you don’t have the initial content for a buffer and you need to create a buffer with a certain
capacity to hold data in the future, you can create a new buffer by specifying its length like this:
*/
var buff = new Buffer(1024); // creating a 1024 byte buffer

//accessing the tenth position in the buffer
var pos = new Buffer('my buffer content');
console.log(pos[10]);