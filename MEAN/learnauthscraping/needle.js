var needle = require('needle');

var data = {
  userId:'14BCE0296'
}
needle.post('https://in.yahoo.com/?p=us',data, function(err, resp) {
  console.log(resp.body.toString()); // this little guy won't be a Gzipped binary blob
                          // but a nice object containing all the latest entries
});
