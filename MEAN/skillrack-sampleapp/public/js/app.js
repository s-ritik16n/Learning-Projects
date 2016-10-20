'use strict';

var app = angular.module('app',['ngRoute','ngResource']).run(function($rootScope){
  $rootScope.userid = '';
  $rootScope.authenticated = false
});

app.config(function($locationProvider,$routeProvider){
  $routeProvider.
  when("/",{
    templateUrl: 'main.html',
    controller: 'log'
  }).
  when("/signup",{
    templateUrl: 'signup.html',
    controller: 'log'
  }).
  when('/student',{
    templateUrl: 'student.html',
    controller: 'student',
  }).
  when('/code',{
    templateUrl: 'code.html',
    controller: 'render'
  }).
  when('/marks',{
    templateUrl: 'marks.html',
    controller : 'student'
  }).
  when('/teacher',{
    templateUrl: 'teacher.html',
    controller : 'teacher'
  })
  $locationProvider.html5Mode({
    enabled:true
  })
});

app.factory('code', function () {
    function set(obj) {
        localStorage.setItem('code', obj);
    }

    function get() {
        return localStorage.getItem('code');
    }

    return {
        set: set,
        get: get
    }
});

app.factory('id', function () {
    function set(obj) {
        localStorage.setItem('id', obj);
    }

    function get() {
        return localStorage.getItem('id');
    }

    return {
        set: set,
        get: get
    }
});

app.factory('userid',function(){
  function set(id){
    localStorage.setItem('userid',id);
  }
  function get(){
    return localStorage.getItem('userid');
  }

  return{
    set : set,
    get : get
  }
})

app.controller("student",function($scope,$http,$window){
  $scope.load = function(){
    $http.get('/getteacher').success(function(data){
      $scope.teachers = data;
    })
  }
  $scope.marks = function(){
    $http.get('/getmarks').success(function(data){
      $scope.result = data;
      console.log($scope.result);
    })
  }
});

app.controller("teacher",function($rootScope,$scope,$http,$window,code,id){
  console.log($rootScope.id);
  $scope.load = function(){
    $http.get('/getcode').success(function(data){
      if(data.length>0){
        $scope.message = "";
        $scope.codes = data;
        console.log($scope.codes);
      }
      else {
        $scope.codes="";
        $scope.message = "No code submissions yet";
      }
    })
  };

  $scope.send = function(idd){
    console.log(idd);
    $http.get("/code/"+idd).success(function(data){
      code.set(data.code);
      id.set(idd.toString())
      $window.location.href ='/code';
    })
  }
});

app.controller('render',function($http,$rootScope,$interval,$scope,$timeout,code,id){

  $scope.renders = function(){
    $scope.code = JSON.stringify(code.get());
    $scope.code = JSON.parse($scope.code)
    $scope.id = JSON.stringify(id.get());
    $scope.id = JSON.parse($scope.id)
    //$scope.m = $scope.mm[0];
    console.log(typeof $scope.code);
    console.log(typeof $scope.id);
  }
  $scope.update = function(){
    var data = JSON.stringify({
      marks:$scope.marks,
    })
    $http.post('/code/'+$scope.id,data).success(function(result){
      if(result.done==true){
        $scope.done = 'done';
        $scope.err = '';
      }
      else {
        $scope.done="";
        $scope.err = 'error:request rejected';
      }
    })
  }

  $scope.logout = function(){
    userid.set("");
    $rootScope.authenticated = false;
    console.log(JSON.parse(JSON.stringify(userid.get())));
    $window.location.href='/'
  }
  
});

app.controller("log",function($rootScope,$scope,$http,$window,$location,id,userid){
  console.log("in log controller");
  $scope.login = function(){
    var data = JSON.stringify({
      check:$scope.check,
      id:$scope.id,
      password:$scope.password
    });
    $http.post("/",data).success(function(data){
      console.log("in post");
      console.log(data.exists);
      if(data.exists == true){
        userid.set(data.id);
        $rootScope.authenticated = true;
        if(data.user == "s"){
          $window.location.href="/student";
        }
        else if(data.user == "t"){
          $window.location.href="/teacher";
        }
      }
      else {
        $rootScope.authenticated=false;
        $rootScope.id = '';
        $scope.message="invalid credentials"
      }
      $scope.check = '';
      $scope.id='';
      $scope.password='';
    })
  }

  $scope.signup = function(){
    console.log("in signup");
    var data = JSON.stringify({
      check: $scope.check,
      id:$scope.id,
      name: $scope.name,
      password:$scope.password
    });
    $http.post('/signup',data).success(function(obj){
      console.log("in post");
      console.log(obj);
      if(obj.exists){
        $scope.message = "username is taken or invalid"
      }
      else{
        userid.set(obj.id);
        $rootScope.authenticated = true;
        console.log($rootScope.id);
        console.log($rootScope.authenticated);
        if(obj.user == "s"){
            $window.location.href = "/student";
        }
        else if(obj.user == "t"){
          $window.location.href = '/teacher';
        }
      }
    })
    .error(function(obj){
      $scope.message = 'error'
    })
  }

  $scope.load=function(){
    $scope.userid = JSON.parse(JSON.stringify(userid.get()));
    console.log(typeof $scope.userid);
    if($scope.userid){
      $rootScope.authenticated = true;
    }
    else {
      $rootScope.authenticated = false
    }
  }

  $scope.logout = function(){
    userid.set("");
    $rootScope.authenticated = false;
    console.log(JSON.parse(JSON.stringify(userid.get())));
    $window.location.href='/'
  }
});
