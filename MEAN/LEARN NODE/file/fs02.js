const fs = require('fs');

fs.stat('/etc/passwd',function(err,stats){
    try{
        if(err) {throw new Error;}
        console.log(stats);
    }
    catch(Error){
    console.log('error catched');
}
});

/*The fs.stat() function call passes an instance of the stats class into the callback function,
which you can use to call any of the following:
➤
 stats.isFile()— Returns true if the file is a standard file and not a directory, a socket, a
symbolic link, or a device.
➤
 stats.isDirectory()—Returns true if the file is a directory.
➤
 stats.isBlockDevice()—Returns true if the file is a device of the type block; in most
UNIX systems this is generally under the /dev directory.
➤
 stats.isCharacterDevice()—Returns true if the file is a device of the character type.
➤
 stats.isSymbolicLink()—Returns true if the fi le is a symbolic link to another file.
➤
 stats.isFifo()— Returns true if the fi le is a FIFO (a special kind of UNIX named pipe).
➤
 stats.isSocket()—Returns true if the fi le is a UNIX domain socket.
*/