'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$http', '$location', 'Notification', '$rootScope', '$cookies', function($scope, $http, $location, Notification, $rootScope, $cookies) {

	$scope.init = function() {
		$scope.userDatasLocal = null;
		$scope.getMyDatasRequest();
	}
	

	

  

  $scope.success = function() {
    Notification.success('Cadastro realizado com sucesso!');
  };

  $scope.error = function() {
    Notification.error('Erro no cadastro!');
  };

  $scope.changeView = function(view) {
    $location.path(view);
  }


    $scope.SendData = function () {
        
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $cookies.get('bearer')
            }
        }

        $http.patch('http://ribolitests.eastus2.cloudapp.azure.com:8080/accounts/', $scope.userDatasLocal, config)
        .success(function (data, status, headers, config) {
            $scope.success();
        })
        .error(function (data, status, header, config) {
            $scope.error();
        });
    };


    $scope.getMyDatasRequest = function() {

        $http({
          method: 'GET',
          url: 'http://ribolitests.eastus2.cloudapp.azure.com:8080/accounts/',
          headers: {'Authorization': 'Bearer ' + $cookies.get('bearer')}
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.userDatasLocal = response.data;
            
          }, function errorCallback(response) {
            $scope.error();
            // called asynchronously if an error occurs
            // or server returns response with an error status.

          });
    }


}]);

