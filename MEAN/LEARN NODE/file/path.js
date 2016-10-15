const path = require('path');
var foo = 'a//b/c//d//';
console.log(path.normalize(foo));

var foo2 = 'a//b//c//d/..';
console.log(path.normalize(foo2));


//path.join -- also normalizes the path
console.log(path.join('/yes','payphone','is','the','name//'));

//path.resolve
console.log(path.resolve('/foo/bst//','.//slfdndlsf'));
console.log(path.resolve('/foo/bst/','./sdmfsdf'));
console.log(path.resolve('/foo/bar', '/tmp/file/'));


/*
If the resulting path is not absolute, path.resolve will prepend the current working directory to
the path, as in this example:
*/
console.log(path.resolve('wwroot','fdsfsdf.png','./fjsbfsdbf'));
console.log(path.resolve('wwroot','./fdsfsdf.png','./fjsbfsdbf'));
console.log(path.resolve('./wwroot','./fdsfsdf.png','./fjsbfsdbf'));

console.log(path.dirname('/ndfdsf/sdffd/dfgdsgff'));
console.log(path.dirname('/ndfdsf/sdffd/dfgdsgff.png'));

console.log(path.basename('/ndfdsf/sdffd/dfgdsgff.png'));

/*
By using path.relative(), you can also determine how to get from one absolute path to anothabsolute path. For example:
*/

console.log(path.relative('a/b/c/d','a/b/g/h'));
console.log(path.relative('a/b/c/d','/a/b/g/h'));
console.log(path.relative('/a/b/c/d','/a/b/g/h'));
