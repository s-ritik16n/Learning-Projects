var buff = new Buffer('this is the content of my new string');
var str = buff.toString();

/*
If you specify an encoding you can convert the buffer to another encoding.to convert a buffer to a base64-encoded string, you can do so this way:
*/
var base64 = buff.toString("base64");

/*
Using the toString method you can, for instance, transcode a UTF-8 string into base64 like this:
*/
var utf8string = 'my string';
var buffs = new Buffer(utf8string);
var base64str = buffs.toString('base64');

console.log(str);
console.log(base64);
console.log(buffs);
console.log(base64str);