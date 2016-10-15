'use strict';

angular.module('try').config(function(
  $locationProvider,
  $routeProvider
){
  $locationProvider.html5Mode({
    enabled: true
  })

  $routeProvider.
  when("/",{
    template: "<blog-listitem></blog-listitem>"
  }).
  when("/blog/19",{
    template:"<h1>Hi</h1>"
  }).
  when("/blog/20",{
    template: "<blog-listitem></blog-listitem>"
  }).
  otherwise({
    template: " Not found"
  })
});
