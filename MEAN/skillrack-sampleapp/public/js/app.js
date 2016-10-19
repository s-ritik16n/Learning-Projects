'use strict';

//maximus' edits

var app = angular.module('app',['ngRoute','ngResource']).run(function($rootScope){
  $rootScope.m = {};
});

app.config(function($locationProvider,$routeProvider){
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

app.controller("student",function($scope,$http,$window){
  $scope.load = function(){
    $http.get('/getteacher').success(function(data){
      $scope.teachers = data;
    })
  }
  $scope.marks = function(){
    $http.get('/getmarks').success(function(data){
      $scope.result = data;
    })
  }
});

app.controller("teacher",function($rootScope,$scope,$http,$window,code,id){
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
});

app.controller("log",function($scope,$http,$window,$location){
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
        if(data.user == "s"){
            $location.path('/student');
            $window.location.reload();
        }
        else if(data.user == "t"){
          $location.path('/teacher');
          $window.location.reload();
        }
      }
      else {
        $scope.message="incorrect login details"
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
        $scope.message = "username taken"
      }
      else{
        if(obj.user == "s"){
            $location.path('/student');
            $window.location.reload();
        }
        else if(obj.user == "t"){
          $location.path('/teacher');
          $window.location.reload();
        }
      }
    })
    .error(function(obj){
      $scope.message = 'error'
    })
  }
})
