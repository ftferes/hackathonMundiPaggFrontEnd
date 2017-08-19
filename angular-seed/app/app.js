'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.header',
  'myApp.profile',
  'myApp.register',
  'myApp.myInvestments',
  'ngCookies',
  'ui-notification',
  'ngAnimate',
  'myApp.version',
  'jkAngularRatingStars'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
