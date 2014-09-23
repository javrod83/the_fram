'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('LoginCtrl',[
  	'$scope',
    '$timeout',
    'LoginService',
    'FarmServices',
    '$state',
    'initData',
  function ($scope, $timeout, LoginService, FarmServices,$state,initData) {

        $scope.overlay = false;  
        $scope.timeOut = false;  //rabbit
      
        //User is allready loged ? 
    if (LoginService.loged){ // Yes user it's allready logedIn 

        //Get Current Status
        FarmServices.getStatus().then(function(data){
          
            //redirect to current status view
            $state.go(data['status-url']);

        },function(err){

            //show error connection overlay
            $scope.overlay = true;  
            $scope.timeOut = true;  //rabbit
            $scope.missedTitle = FarmServices.data.diccionary.error.general;
            $scope.missedText = FarmServices.data.diccionary.error.connection;
            console.log(err)
        });

    }else { //User must login
        LoginService.init(FarmServices.config.social);

        $scope.title = FarmServices.data.dictionary.login.title;
        $scope.tos = FarmServices.data.dictionary.tos;
        $scope.social = {
          fb : false,
          g  : false,
          tw : false
        };

        for (var ind in FarmServices.config.social.networks)
          {
            var networkID = FarmServices.config.social.networks[ind];
            var netWorkFullName =  LoginService.dictionary[networkID];
          
            $scope[netWorkFullName] = {
                title : FarmServices.data.dictionary.login[netWorkFullName].title,
                error : FarmServices.data.dictionary.login[netWorkFullName].error
            };

            $scope.social[networkID]=true;
          }

        $scope.login = function(net){

            hello( LoginService.dictionary[net] ).login().then(function(data){     
                FarmServices._saveSocial({
                  id: net,
                  network:data.network,
                  token: data.authResponse.access_token
                });
                console.log('Registration '+LoginService.diccionary[net]+' success');
                
                $state.go('prompt')
              },function(res){
                console.log('Registration '+LoginService.diccionary[net]+' failed');
                console.log(res.error);

                //cambiar la clase del error 

              });
        };
    }




       $scope.$on('animIn', function() {
                console.log(' Login: animIn');
            });

      $scope.$on('animOut', function() {
          console.log(' Login: animOut');
      });

  }]);
