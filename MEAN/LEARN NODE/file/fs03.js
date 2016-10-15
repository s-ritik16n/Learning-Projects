const fs = require('fs');

/*
OPENING A FILE
Before you can read or manipulate files, you have to open them using the fs.open function. Then, a
callback function you provide is invoked with the file descriptor, which you can later use to read or
write to the opened file.
*/

fs.open('/etc/passwd','r',function(err,fd){
    console.log('got fd file descriptor');
});
/*
The first argument to fs.open() is the file path. The second argument contains the flags, which
indicate the mode with which the file should open. The flags can be r, r+, w, w+, a, or a+. Here are
the semantics of these flags (taken from the fopen UNIX manual page):

➤r—Opens the text file for reading. The stream is positioned at the beginning of the file.

➤r+—Opens the file for reading and writing. The stream is positioned at the beginning of the
file.

➤w—Truncates the file to zero length or creates a text file for writing. The stream is
positioned at the beginning of the file.

➤w+—Opens the file for reading and writing. The file is created if it does not exist. Otherwise
it is truncated. The stream is positioned at the beginning of the file.

➤a—Opens the file for writing. The file is created if it does not exist. The stream is
positioned at the end of the file. Subsequent writes to the file will always end up at the
current end of file.

➤a+—Opens the file for reading and writing. The file is created if it does not exist. The
stream is positioned at the end of the file. Subsequent writes to the file will always end up at
the current end of file.

*/