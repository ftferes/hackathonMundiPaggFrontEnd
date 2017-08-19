'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])


.controller('RegisterCtrl', ['$scope', '$http', '$location', 'Notification', function($scope, $http, $location, Notification) {
  
  $scope.userDatas = {
    "Address": {
        "City": null,
        "Complement": null,
        "Country": null,
        "District": null,
        "Number": null,
        "State": null,
        "Street": null,
        "ZipCode": null
    },
    "LoanTypeEnum": null,
    "LoanInCents": null,
    "BirthDate": null,
    "DueDate": null,
    "Email": null,
    "FacebookId": null,
    "GenderEnum": null,
    "HomePhone": null,
    "MobilePhone": null,
    "Name": null,
    "TwitterId": null,
    "WorkPhone": null,
    "Username": null,
    "Password": null,
    "TaxPerDay": null,
    "Documents": [
      {
        "DocumentType": "RG",
        "DocumentNumber": null
      },
      {
        "DocumentType": "CPF",
        "DocumentNumber": null
      }
    ]
  }

  $scope.success = function() {
    Notification.success('Cadastro realizado com sucesso!');
  };

  $scope.error = function() {
    Notification.error('Erro no cadastro!');
  };

  $scope.changeView = function(view) {
    $location.path(view); // path not hash
  }

  $scope.response = null;

        $scope.SendData = function () {
            var data = $scope.userDatas2;
        
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            $http.post('http://ribolitests.eastus2.cloudapp.azure.com:8080/accounts/', $scope.userDatas, config)
            .success(function (data, status, headers, config) {
                $scope.success();
                $scope.response = data;
                $scope.changeView('view1')
            })
            .error(function (data, status, header, config) {
                $scope.error();
            });
        };



}]);

