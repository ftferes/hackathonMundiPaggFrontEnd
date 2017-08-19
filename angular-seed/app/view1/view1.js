'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.image = [
		{
			src: 'img/home/boneco111.png',
		},
		{
			src: 'img/home/boneco2.png',
		},
		{
			src: 'img/home/boneco33.png',
		}
	];

	$scope.changeView = function(view){
        $location.path(view); // path not hash
    }

	$scope.response = null;

	// Simple GET request example:
	// $http({
	//   method: 'GET',
	//   url: 'http://ribolitests.eastus2.cloudapp.azure.com:8080/accounts/ef94290b-e522-4a1d-b499-256020a888d0'
	// }).then(function successCallback(response) {
	//     // this callback will be called asynchronously
	//     // when the response is available
	//     $scope.response = response;
	//   }, function errorCallback(response) {
	//     // called asynchronously if an error occurs
	//     // or server returns response with an error status.
	//     $scope.response = response;
	//   });

}]);

