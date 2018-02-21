'use strict';

angular.module('blogList')
  .component('blogListitem',{
    //template: "<div class=''><h1 class='new-class'>{{ title }}</h1><button ng-click='someClickTest()'>CLick ME!</button></div>",
    templateUrl : '/templates/blog-list.html',
    controller:function($scope){
      console.log("Hello");
      var blogItems = [
        {title: "Ritik",age: 19},
        {title: "Saxena",age: 18}
      ]
      $scope.items = blogItems;
      $scope.title="Hi there"
      $scope.clicks = 0
      $scope.someClickTest = function(){
        console.log("CLicked");
        $scope.clicks += 1
        $scope.title="Clicked "+$scope.clicks+" times"
      }
    }
  })/*
  .controller('BlogListController',function($scope){
    console.log("Hello");
    $scope.title="Hi there"
    $scope.clicks = 0
    $scope.someClickTest = function(){
      console.log("CLicked");
      $scope.clicks += 1
      $scope.title="Clicked "+$scope.clicks+" times"
    }
  });
*/
