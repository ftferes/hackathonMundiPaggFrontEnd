'use strict';

angular.module('myApp.header', [])

.controller('HeaderCtrl', ['$scope', '$location', '$rootScope', '$cookies', '$http', 'Notification', function($scope, $location, $rootScope, $cookies, $http, Notification) {
    
    $scope.init = function() {
        $scope.userLogged = $cookies.get('userLogged');
        
        if($scope.userLogged == null) {
            $scope.userLogged = false;
        }


        $rootScope.userDatas = null;
        if($scope.userLogged) {
            $scope.getMyDatasRequest();
        }
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


    $scope.user = {
        name: '',
        password: ''
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

    $scope.success = function() {
        Notification.success('Login realizado com sucesso!');
    };

    $scope.error = function() {
        Notification.error('Erro no login!');
    };

    $scope.loginRequest = function() {
        var data = {
            "username": $scope.user.name,
            "password": $scope.user.password
        }
       
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http.post('http://ribolitests.eastus2.cloudapp.azure.com:8080/auth/', data, config)
        .success(function (data, status, headers, config) {
            $scope.success();
            $scope.response = data;
            $cookies.put('bearer', data.Bearer);
            $scope.getMyDatasRequest();
            $scope.changeView("view2");
            

        })
        .error(function (data, status, header, config) {
            $scope.error();
            $scope.user = {
                name: '',
                password: ''
            }
        });
    }

    $scope.getMyDatasRequest = function() {

        $http({
          method: 'GET',
          url: 'http://ribolitests.eastus2.cloudapp.azure.com:8080/accounts/',
          headers: {'Authorization': 'Bearer ' + $cookies.get('bearer')}
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $rootScope.userDatas = response.data;
            
          }, function errorCallback(response) {
            $scope.error();
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.response = response;
          });
    }
    



}]);