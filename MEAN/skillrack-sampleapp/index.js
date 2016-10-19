var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var session = require('express-session');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : PASSWORD_HERE,
  database : 'dbmsPranav'
});

connection.connect();

var app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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
if(req.body.check == 0){
  value = {
    s_id: req.body.id,
    password:req.body.password
  }
  connection.query("SELECT * from student where s_id = ? and password = ?",[value.s_id,value.password],function(err,result){
    try {
      if(err){
        throw(err);
      }
    } catch (e) {
      console.error(e);
      return;
    }
    if(result.length>0){
        req.session.iid = result[0].s_id.toString();
        req.session.name = result[0].NAME.toString();
        req.session.save();
      res.json({
          exists:true,
          user : "s",
          id : req.session.iid,
          name : req.session.name
        });
    }
    else {
      res.json({
        exists:false
      });
    }
  })
}
if(req.body.check == 1){
  value = {
    t_id: req.body.id,
    password:req.body.password
  }
  connection.query("SELECT * from teacher where t_id = ? and password = ?",[value.t_id,value.password],function(err,result){
    try {
      if(err){
        throw(err);
      }
    } catch (e) {
      console.error(e);
      return;
    }
    if(result.length>0){
        req.session.iid = result[0].t_id.toString();
        req.session.name = result[0].name.toString();
        req.session.save();
      res.json({
          exists:true,
          user : "t",
          id : req.session.iid,
          name : req.session.name
        });
    }
    else {
      res.json({
        exists:false
      });
    }
  })
}

});

app.route('/signup')
.get(function(req,res){
  res.sendFile(path.join(__dirname,'public','signup.html'))
})
.post(function(req,res){
  if(req.body.check == 0){
    req.session.user='student';
    req.session.iid = req.body.id.toString();
    req.session.name=req.body.name.toString();
    req.session.save();
    values = {
      s_id: req.body.id.toString(),
      NAME: req.body.name.toString(),
      password:req.body.password.toString(),
      date: Date.now().toString()
    }
    connection.query("INSERT INTO student set ?",values,function(err,result){
      try {
        if(err){
          throw(err)
        }
      } catch (e) {
        console.error(e);
        res.json(e);
        return;
      }
      if(result.affectedRows>0){
        res.json({
            exists:false,
            user : "s",
            id : req.session.iid,
            name : req.session.name
          });
      }
      else {
        res.json({
          exists:true
        });
      }
    });
  }
  else if(req.body.check == 1){
      req.session.user='teacher';
      req.session.iid = req.body.id.toString();
      req.session.name=req.body.name.toString();
      req.session.save();
    values = {
      t_id: req.body.id.toString(),
      name: req.body.name.toString(),
      password:req.body.password.toString(),
      date: Date.now().toString()
    }
    connection.query("INSERT INTO teacher set ?",values,function(err,result){
      try {
        if(err){
          throw(err)
        }
      } catch (e) {
        console.error(e);
        res.json(e)
        return;
      }
      if(result.affectedRows>0){
        res.json({
            exists:false,
            user : "t",
            id : req.session.iid,
            name : req.session.name
          });
      }
      else {
        res.json({
          exists:true
        });
      }
    });
  }
});

app.route("/student")
.get(function(req,res){
  res.sendFile(path.join(__dirname,'public','student.html'));
})
.post(function(req,res){
  var date = new Date();
  values = {
    title: req.session.iid+"-"+date.getUTCDate()+'/'+(date.getUTCMonth() + 1)+'/'+date.getUTCFullYear(),
    s_id : req.session.iid,
    code: req.body.code,
    dos: Date.now(),
    t_id:req.body.teacher
  }
  connection.query("INSERT INTO code SET ?",values,function(err,result){
    try {
      if(err){
        throw(err);
      }
    } catch (e) {
      console.error(e);
      return;
    }
    res.send("done<br/><br/><a href='/student'>back</a>");
  });
});

app.get('/getcode',function(req,res){
  value = req.session.iid;
  connection.query("SELECT * FROM code where t_id = ?",[value.toString()],function(err,result){
    try {
      if(err){
        throw(err);
      }
    } catch (e) {
      console.error(e);
      return;
    }
    res.json(result);
  })
});

app.get("/teacher",function(req,res){
  res.sendFile(path.join(__dirname+'/public/teacher.html'));
})
app.get('/getteacher',function(req,res){
  connection.query("SELECT t_id,name from teacher",function(err,result){
    try {
      if(err){
        throw(err);
      }
    } catch (e) {
      console.error(e);
      return;
    }
    res.json(result);
  })
});

app.get('/marks',function(req,res){
  res.sendFile(path.join(__dirname,'public','marks.html'))
});

app.get('/getmarks',function(req,res){
  connection.query("SELECT title,marks from code where s_id=?",[req.session.iid],function(err,result){
    if(err){
      console.error(err);
      res.json({
        done:false
      })
    }
    else {
      console.log(result);
      res.json(result);
    }
  })
})

app.get('/code',function(req,res){
  res.sendFile(path.join(__dirname,'public','code.html'))
})

app.route('/code/:id')
.get(function(req,res){
  connection.query("SELECT code from code where id = ?",[req.params.id],function(err,result){
    try {
      if(err){
        throw(err);
      }
    } catch (e) {
      console.error(e);
      return;
    }
    res.send(result[0]);
  })
})
.post(function(req,res){
  connection.query("UPDATE code set marks=? where id=?",[req.body.marks,req.params.id],function(err,result){
    if(err){
      console.error(err);
      res.json({
      done:false
      });
      return;
    }
    console.log(result);
    res.json({
      done:true
    });
  })
});

app.get('/logout',function(req,res){
  delete req.session;
  res.redirect('/')
})
app.listen("3000");
console.log("Magic happens at 3000");
