var urllib = require('urllib');

urllib.request('http://phc.prontonetworks.com/cgi-bin/authlogin',{
  method:'POST',
  headers:{
    'Content-Type': ' application/json'
  },
  data: JSON.stringify({
    a:'14BCE0296',
    b:'2340532'
  })
},function(err,data,res){
  if(err){
    console.log(err);
  }
  console.log(data.toString());
  console.log(res);
})
