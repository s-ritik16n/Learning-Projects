const path = require('path');
/*
A file path can also include an extension, which is usually the string in the base name after and
including the last . character.
*/

console.log(path.extname('/foo/dfasdf/sdfd.html'));
console.log(path.extname('fnsdlf/sdfg.'));

/*You can subtract the file extension from the result by passing in an optional second argument with
the expected extension, like this:
*/
console.log(path.basename('/sfsd/fsdlfj.html','.html'));


/*Determining the Existence of a Path*/
