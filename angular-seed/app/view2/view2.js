'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$rootScope', '$http', 'Notification','$cookies', '$location', function($scope, $rootScope, $http, Notification, $cookies, $location) {

	$scope.accounts = [];

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

    $scope.filters = {
    	value: null,
    	name: null,
    	rating: null,
    	hasBorrowed: null,
    	hasLended: null
    }

    $scope.error = function() {
        Notification.error('Erro na Busca!');
    };

    $scope.errorLend = function() {
        Notification.error('Erro na Busca!');
    };

    $scope.notify = function() {
    	Notification.success('Notificação enviada com sucesso. Aguarde retorno.');
    }

    $scope.lend = function(personBorrower) {

        var data = {
		    "AmountInCents": personBorrower.LoanInCents,
		    "DueDate": "2017-10-10",
		    "PersonBorrowerKey": personBorrower.PersonKey,
		    "PersonLenderKey": $rootScope.userDatas.PersonKey,
		    "TaxPerDay": personBorrower.TaxPerDay
		}
        
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $cookies.get('bearer')
            }
        }

        $http.post('http://ribolitests.eastus2.cloudapp.azure.com:8080/loans/', data, config)
        .success(function (data, status, headers, config) {
        	$scope.notify();
    		$scope.changeView('myInvestments');            
        })
        .error(function (data, status, header, config) {
            $scope.errorLend();
        });
    }

    $scope.changeView = function(view) {
        
        $scope.user = {
            name: '',
            password: ''
        }

        if(view == 'view1') {

            $cookies.remove('userLogged');
            $cookies.remove('bearer');
            $scope.userLogged = false;

        } else if (view == 'register') {

            $cookies.remove('userLogged');
            $cookies.remove('bearer');
            $scope.userLogged = false;

        } else {

            $cookies.put('userLogged', true);
            $scope.userLogged = true;
        }


        $location.path(view); // path not hash
    }






    $scope.searchRequest = function() {
        var data = {
		    "TypeSearch": $rootScope.userDatas.LoanTypeEnum == 'Lender' ? 'Borrower' : 'Lender',
		    "TypeOrder": "AmountInCents",
		    "Name": $scope.filters.name,
		    "MininumGrade": $scope.filters.rating,
		    "AmountInCents": $scope.filters.value * 100 == 0 ? null : $scope.filters.value * 100,
		    "HasBorrowed": $scope.filters.hasBorrowed,
		    "HasLended": $scope.filters.hasLended
		}
        
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $cookies.get('bearer')
            }
        }

        $http.post('http://ribolitests.eastus2.cloudapp.azure.com:8080/accounts/search/', data, config)
        .success(function (data, status, headers, config) {
            $scope.accounts = data;
        })
        .error(function (data, status, header, config) {
            $scope.error();
        });
    }

}]);