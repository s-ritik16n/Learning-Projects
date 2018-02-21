var request  = require('request')

var options = {
    uri: 'https://in.yahoo.com/?p=us',
    method: 'POST',
    json: true,
    headers : {
        "Content-Type":"application/json",
        "Accept":"application/json",
    },
    body : {
      search:'anything'
    }
};

request(options, function(error, response, body) {
    if (!error) {
        console.log('Body is:');
        console.log(body);
      } else {
        console.log('Error is:');
        logger.info(error);
      }
});
