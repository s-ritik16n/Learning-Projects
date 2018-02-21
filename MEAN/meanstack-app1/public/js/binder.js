'use strict'

var app = angular.module('app',['ngRoute','ngResource']);

app.config(function($locationProvider,$routeProvider){
  $locationProvider.html5Mode({enabled:true})
  $routeProvider.
  when('/',{
    templateUrl: 'partials/main.html',
    controller : 'auth'
  }).
  when('/signup',{
    templateUrl : 'partials/signup.html',
    controller: 'auth'
  }).
  when('/home',{
    templateUrl : 'partials/home.html',
    controller: 'home'
  }).
  when('/ques',{
    templateUrl : 'partials/question.html',
    controller : 'home'
  }).
  when('/allques',{
    templateUrl: 'partials/all.html',
    controller : 'home'
  }).
  when('/myques',{
    templateUrl:'partials/myques.html',
    controller:'home'
  })
})

//factory for q_id
app.factory('setdata',function(){
  function set(obj){
    localStorage.setItem('id',obj);
  }
  function get(){
    return localStorage.getItem('id')
  }
  return {
    set : set,
    get : get
  }
})

//factory for user id
app.factory('setuserid',function(){
  function set(id){
    localStorage.setItem('userid',id);
  }
  function get() {
    return localStorage.getItem('userid');
  }
  return{
    set:set,
    get:get
  }
})


app.controller('auth',function($scope,$http,$window,setuserid,setdata,$rootScope){

  $scope.login = function(){
    var data = JSON.stringify({
      username : $scope.username,
      password : $scope.password
    })
    $http.post('/',data).success(function(result){
      if(result.exists==true){
        setuserid.set($scope.username)
        $rootScope.authenticated = true;
        $window.location.href = '/home';
      }
      else {
        console.log("login");
        $rootScope.authenticated=false;
        $rootScope.id = '';
        $scope.message="invalid credentials"
      }
    })
  }
  $scope.loadauth =  function(){
    if(JSON.parse(JSON.stringify(setuserid.get()))){
      $rootScope.authenticated = true;
      $rootScope.userid=JSON.parse(JSON.stringify(setuserid.get()));
    }
    else {
      $rootScope.authenticated = false
    }
  }
  $scope.logout = function(){
    $rootScope.authenticated = false;
    setuserid.set("");
    setdata.set("");
    $rootScope.userid = "";
    $window.location.href='/'
    $http.get('/logout');
  }
  $scope.signup = function(){
    var data = JSON.stringify({
      username:$scope.username,
      password:$scope.password,
      name : $scope.name,
      me : $scope.me
    })
    $http.post('/signup',data).success(function(result){
      if(result.exists==true){
        $scope.message = "username is already taken or invalid";
      }
      else {
        $rootScope.authenticated = true;
        setuserid.set(result.username);
        $rootScope.userid = result.username;
        $window.location.href='/home'
      }
    })
  }
})

app.controller('home',function($scope,$window,$http,setdata,$location,$anchorScroll,setuserid,$timeout){
  $scope.loadques = function(){
  $http.get('/getrecent').success(function(result){
    $scope.recent = result;
    console.log($scope.recent);
    })
  }
  $scope.send = function(id){
    console.log("id is"+id);
    setdata.set(id)
    $window.location.href="/ques"
  }
  $scope.loadq = function(){
    var id = JSON.parse(JSON.stringify(setdata.get()))
    $http.get('/question/'+id).success(function(result){
      console.log(result[0].stmt);
      $scope.statement = result[0].stmt;
      $scope.desc = result[0].dsc;
      $scope.top = result[0].timeofpost;
    })
    $http.get('/answer/'+id).success(function(result){
      $scope.answer = result;
      console.log(result);
      $http.get('/getcomments/'+id).success(function(result){
        $scope.comments = result;
      })
    })
  }
  $scope.click = function(){
    $scope.clicked = true;
    //$location.hash("st");
  $timeout(function(){
    $anchorScroll('st')
  })
  }
  $scope.scroll = function(scrl){
    $anchorScroll(scrl);
  }
  $scope.cancel = function(){
    $scope.clicked=false;
  }
  $scope.upvote = function(id,a){
    $http.get('/upvote/'+id).success(function(result){
      a.upvotes = a.upvotes+1;
      console.log(a);
    })
  }
  $scope.downvote = function(id,a){
    $http.get('/downvote/'+id).success(function(result){
      a.downvotes+=1;
      console.log(a);
    });
  }
  $scope.allques = function(){
    $http.get('/getallq').success(function(result){
      $scope.ques = result;
      console.log(result);
    })
  }
  $scope.putans = function(){
    var data=JSON.stringify({
      txt:$scope.ans,
      q_id : JSON.parse(JSON.stringify(setdata.get())),
      u_id : JSON.parse(JSON.stringify(setuserid.get())),
    })
    $http.post('/answer',data).success(function(result){
      var newPost = JSON.parse(data);
      newPost.upvotes = 0;
      newPost.downvotes = 0;
      newPost.a_id = result.insertId;
      console.log(typeof JSON.parse(data));
      $scope.answer.push(newPost);
      $scope.ans="";
      $scope.clicked=false;
    })
  }

  $scope.myques = function(){
    $http.get('/getmyques').success(function(result){
      console.log(result);
      $scope.ques = result;
    })
  }

  $scope.loadformques = function(){
    $scope.loadform = true;
    $scope.success = false;
    $scope.txt='';
    $scope.dsc='';
    $timeout(function() {
        $anchorScroll("submit");
    });
  }

  $scope.cancelformques = function(){
    $scope.loadform = false;
    $scope.success = false;
  }

  $scope.submitques = function(){
    var data = JSON.stringify({
      u_id: JSON.parse(JSON.stringify(setuserid.get())),
      stmt : $scope.txt,
      dsc : $scope.dsc
    })
    $http.post('/postques',data).success(function(id){
      console.log(id);
      $http.get('/question/'+id).success(function(result){
        console.log(result[0]);
        $scope.ques.push(result[0])
        $scope.success = true;
        $scope.loadform = false;
        $scope.txt='';
        $scope.dsc='';
      })
    })
  }

  $scope.showComment = function(id){
    console.log(id);
    $scope.meanid = id;
    $scope.comment = true;
    $scope.commentext = '';
    /*$timeout(function(){
      $anchorScroll('cmt')
    })*/
  }
  $scope.putComment = function(id,txt){
    console.log($scope.commentext);
    var data = JSON.stringify({
      stmt : txt,
      a_id : id,
      u_id : JSON.parse(JSON.stringify(setuserid.get()))
    })
    $http.post('/postcomment/',data).success(function(result){
      $scope.comments.push(JSON.parse(data))
      $scope.comment = false;
      $scope.commentext='';
    })
  }
  $scope.loadComments = function(id){
    console.log(id);
    $http.get('/getcomments/'+id).success(function(result){
      $scope.comments = result;
    })
  }
  $scope.cancelComment = function(){
    $scope.comment = false;
  }
})
