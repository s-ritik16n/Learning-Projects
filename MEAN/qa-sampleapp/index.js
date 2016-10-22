var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '2340532',
  database : 'dbmsproject'
});
connection.connect();


app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret : 'cookieSecret',
    resave : false,
    saveUninitialized:true,
    cookie : {secure:false},
    maxAge: 24*60*60*1000
}));

app.route('/')
.get(function(req,res){
  res.sendFile(path.join(__dirname,'public','index.html'));
})
.post(function(req,res){
  values = {
    user: req.body.username,
    password:req.body.password
  }
  connection.query("SELECT * FROM user where username = ? and password = ?",[values.user,values.password],function(err,result){
    if(err){
      res.json({
        exists: false
      })
    }
    req.session.user = result[0].username;
    req.session.save();
    console.log(req.session.user);
    console.log(result);
    res.json({
      exists:true,
      username : result[0].username,
      name : result[0].name
    })
  })
});

app.get('/home',function(req,res){
  res.sendFile(path.join(__dirname,'public','index.html'));
});

app.get('/getrecent',function(req,res){
  connection.query("SELECT * FROM questions order by q_id desc limit 20",function(err,result){
    console.log(result);
    res.json(result)
  })
})

app.route('/ques')
.get(function(req,res){
  res.sendFile(path.join(__dirname,'public','index.html'))
})

app.post('/answer',function(req,res){
  values = {
    txt : req.body.txt,
    q_id : req.body.q_id,
    u_id : req.body.u_id
  }
  console.log("I'm in post");
  connection.query("insert into answers set ?",values,function(err,result){
    if(err){
      console.log(err);
      return;
    }
    else{
      res.json(result);
    }
  })
})

app.get('/question/:id',function(req,res){
  connection.query("SELECT * FROM questions where q_id=?",[req.params.id],function(err,result){
    console.log("get the question/:"+result[0]);
    res.json(result)
  })
})

app.get('/answer/:id',function(req,res){
  connection.query("SELECT * FROM answers where q_id=? order by a_id",[req.params.id],function(err,result){
    console.log(result);
    res.json(result);
  })
});

app.get('/upvote/:id',function(req,res){
  connection.query('update answers set upvotes = upvotes+1 where a_id = ? ',req.params.id,function(err,result){
    if(result.affectedRows>0){
      res.json({
        exists : true
      })
    }else{
      res.json({
      exists :false
    })
    }
  })
})

app.get('/downvote/:id',function(req,res){
  connection.query("UPDATE answers set downvotes = downvotes + 1 where a_id = ?",req.params.id,function(err,result){
    if(result.affectedRows>0){
      res.json({
        exists : true
      })
    }else{
      res.json({
      exists :false
    })
    }
  })
})

app.get('/getmyques',function(req,res){
  console.log(req.session.user);
  connection.query("SELECT * FROM questions where u_id = ?",req.session.user,function(err,result){
    if(err){
      console.log(err);
      return
    }
    else {
      res.json(result);
    }
  })
})

app.get('/myques',function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})

app.get('/allques',function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})

app.get('/getallq',function(req,res){
  connection.query("SELECT * FROM questions order by q_id desc",function(err,result){
    res.json(result);
  })
})

app.listen('3000');
console.log('Magic happens on port 3000');
