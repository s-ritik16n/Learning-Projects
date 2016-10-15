const fs = require('fs');


fs.exists('/opt',function(exists){
    console.log('exists:'+exists);
});
fs.exists('/sdfadsf/',function(exists){
    console.log('exists:'+exists);
});

//synchronous version of existsSync

console.log(fs.existsSync('/sdfdsf/'));

//PS: the output of this file will show that the last sync call was executed before async calls, the program didn't block with the first request, it assigned a callback and moved ahead, the beauty of node
