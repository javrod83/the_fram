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
  function ($scope, $timeout, LoginService, FarmServices) {
      
      LoginService.init(FarmServices.config.social);

      $scope.user = {};
      //console.log(FarmServices.data);
      $scope.title = FarmServices.data.dictionary.login.title;

      $scope.facebook = {
        title : FarmServices.data.dictionary.login.facebook.title,
        error : FarmServices.data.dictionary.login.facebook.error
      };

      $scope.twitter = {
        title : FarmServices.data.dictionary.login.twitter.title,
        error : FarmServices.data.dictionary.login.twitter.error
      };

      $scope.google = {
        title : FarmServices.data.dictionary.login.google.title,
        error : FarmServices.data.dictionary.login.google.error
      };


       $scope.social = {
          fb : false,
          g  : false,
          tw : false
       };

      for (var ind in FarmServices.config.social.networks)
        {
          var network = FarmServices.config.social.networks[ind];
          console.log(network);
          $scope.social[network]=true;
        }

      console.log($scope.social);
      $scope.login = function(net){

          hello( LoginService.diccionary[net] ).login().then(function(data){     
              FarmServices._saveSocial({
                id: net,
                network:data.network,
                token: data.authResponse.access_token
              });
              console.log('Registration '+LoginService.diccionary[net]+' success');
              window.location.href = '#/prompt';
            },function(res){
              console.log('Registration '+LoginService.diccionary[net]+' failed');
              console.log(res.error);

              //cambiar la clase del error 

            });
      };

      



  }]);
