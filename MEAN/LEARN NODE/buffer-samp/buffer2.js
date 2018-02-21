//slicing a buffer

var buff = new Buffer('this is the content of my new string');
var slice = buff.slice(8,19);
console.log(slice.toString());

//copying a buffer

const targetStart = 0;
const sourceStart = 8;
const sourceEnd = 19;
var buf2 = new Buffer(20);
buff.copy(buf2,targetStart,sourceStart,sourceEnd);
console.log(buf2.toString());
console.log(buf2.toString());
console.log(buf2[16]);

var buf3 = new Buffer(sourceEnd-sourceStart);
buff.copy(buf3,targetStart,sourceStart,sourceEnd);
console.log(buf3.toString());
console.log(buf3.toString());
console.log(buf3[15]);