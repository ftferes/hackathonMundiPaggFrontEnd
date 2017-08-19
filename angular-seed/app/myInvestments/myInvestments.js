'use strict';

angular.module('myApp.myInvestments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myInvestments', {
    templateUrl: 'myInvestments/myInvestments.html',
    controller: 'MyInvestments2Ctrl'
  });
}])

.controller('MyInvestments2Ctrl', ['$scope', '$rootScope', '$http', 'Notification','$cookies', function($scope, $rootScope, $http, Notification, $cookies) {

    $scope.init = function() {
        $scope.loans = null;
        $scope.userDatasLocal = null;
        $scope.getMyDatasRequest();
    }

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

    $scope.error = function() {
        Notification.error('Erro na recuperação dos dados!');
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

            $scope.getLoans();
            
          }, function errorCallback(response) {
            $scope.error();
            // called asynchronously if an error occurs
            // or server returns response with an error status.

          });
    }


    $scope.getLoans = function() {
        $http({
          method: 'GET',
          url: 'http://ribolitests.eastus2.cloudapp.azure.com:8080/loans/',
          headers: {'Authorization': 'Bearer ' + $cookies.get('bearer')}
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.loans = response.data;
            
          }, function errorCallback(response) {
            $scope.error();
            // called asynchronously if an error occurs
            // or server returns response with an error status.

          });
    }

}]);