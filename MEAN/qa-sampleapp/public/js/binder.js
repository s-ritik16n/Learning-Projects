'use strict'

var app = angular.module('app',['ngRoute','ngResource']);

app.config(function($locationProvider,$routeProvider){
  $locationProvider.html5Mode({enabled:true})
  $routeProvider.
  when('/',{
    templateUrl: 'main.html',
    controller : 'auth'
  }).
  when('/home',{
    templateUrl : 'home.html',
    controller: 'home'
  }).
  when('/ques',{
    templateUrl : 'question.html',
    controller : 'home'
  }).
  when('/allques',{
    templateUrl: 'all.html',
    controller : 'home'
  }).
  when('/myques',{
    templateUrl:'myques.html',
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


app.controller('auth',function($scope,$http,$window,setuserid){

  $scope.login = function(){
    var data = JSON.stringify({
      username : $scope.username,
      password : $scope.password
    })
    $http.post('/',data).success(function(result){
      setuserid.set($scope.username)
      console.log(result);
      if(result.exists){
        $window.location.href = '/home';
      }
    })
  }
})

app.controller('home',function($scope,$window,$http,setdata,$location,$anchorScroll,setuserid){
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
    })
  }
  $scope.click = function(){
    $scope.clicked = true;
  //  $location.hash('submit')
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
})
