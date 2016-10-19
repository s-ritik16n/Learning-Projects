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
/*
app.factory('share',function(){
  var data = {};
  this.set = function(obj){
    data = obj;
  }
    this.get = function(){
    return data;
  }
  return {
  set: this.set,
  get: this.get
 }
});*/
app.factory('share', function ($rootScope) {
    var events = $rootScope.$new(true);
    var data = {};

    function on(event, callback) {
        events.$on(event, callback);
    };

    function set(obj) {
        data = obj;
        console.log(this.data);
        events.$emit('set', data);
    };

    function get() {
        return data;
    };

    return {
        on : on,
        set: set,
        get: get
    };
});
/*
app.factory('share', function ($rootScope) {
    var events = $rootScope.$new(true);
    var data = {};

    this.on = function (event, callback) {
        events.$on(event, callback);
    };

    this.set = function (obj) {
        this.data = obj;
        events.$emit('set', data);
    };

    this.get = function () {
        return this.data;
    };

    return {
        set: this.set,
        get: this.get
    };
});
*/
/*
app.factory('share', function ($rootScope) {
    var events = $rootScope.$new(true);

    this.on = function (event, callback) {
        events.$on(event, callback);
    };

    this.set = function (obj) {
        this.data = obj;
        events.$emit('set', data);
    };
});
*/
app.controller("student",function($scope,$http){
  $scope.load = function(){
    $http.get('/getteacher').success(function(data){
      $scope.teachers = data;
    })
  }
});

app.controller("teacher",['$rootScope','$scope','$http','$window','share',function($rootScope,$scope,$http,$window,share){
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

  $scope.send = function(id){
    console.log(id);
    $http.get("/code/"+id).success(function(data){
      share.set(data);
      $window.location.href ='/code';
    })
  }
}]);

app.controller('render',function($rootScope,$interval,$scope,$timeout,share){

/*
  $scope.$watch(function () {
      return share.get();
  }, function (value) {
    console.log(value);
    console.log(value);
      $scope.m = value;
  });*/
  $scope.$watch(function () {
return share.get();
}, function (value) {
console.log(value);
$scope.m = value;
});
  console.log("render");
  /*share.on('set', function (value) {
    console.log(value);
    $scope.m = value;
});*/
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
