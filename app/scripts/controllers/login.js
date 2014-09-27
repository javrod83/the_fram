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

      //Properties
      $scope.overlay     = false ;  
      $scope.timeOut     = false ;  //rabbit
      $scope.missedTitle = '' ;
      $scope.missedText  = '' ;


      //mobile mock
      var doTheMocking = true ; 

      //log
      var modName = 'LoginCtrl';

      function log(method,msg)
        {
          console.log('['+modName+']: '+method+' : '+msg);
        }

      //Methods
      $scope.login = function(net){
          log('login','<--');
          log('login','Social Service: '+LoginService.dictionary[net]);

          if (doTheMocking = true  )
            {
                LoginService.saveSocial({
                  id: 'mc',
                  network:'mockNetwork',
                  token: 'MOCKMOCKMOCKMOCKMOCKMOCKMOCKMOCK'
                });
                $state.go('prompt');
            }
          else 
            hello( LoginService.dictionary[net] ).login()
              .then(function(data){

                log('login',LoginService.dictionary[net]+' success');
                LoginService.saveSocial({
                  id: net,
                  network:data.network,
                  token: data.authResponse.access_token
                });
                log('login',' redirect to: prompt');
                $state.go('prompt');

              },function(res){

                log('login',LoginService.dictionary[net]+' fail');

                console.log(res.error);
                $scope.overlay = true;  
                $scope.timeOut = true;
                $scope.missedTitle = FarmServices.data.dictionary.error.general;
                $scope.missedText = FarmServices.data.dictionary.error.connection;

              });
      };

        //User is allready loged ? 
      if (LoginService.loged || LoginService.loadLocalLogin()){ // Yes user it's allready logedIn 

          //Get Current Status
          FarmServices.getStatus().then(function(data){
              log('getStatus','success');
              console.log(data);
              //redirect to current status view
              $state.go(data.frame.type);

          },function(err){
              log('getStatus','fail');
              //show error connection overlay
              $scope.overlay = true;  
              $scope.timeOut = true;  //rabbit
              $scope.missedTitle = FarmServices.data.dictionary.error.general;
              $scope.missedText = FarmServices.data.dictionary.error.connection;
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
      }

       $scope.$on('animIn', function() {
           log('animIn','<--');
        });

      $scope.$on('animOut', function() {
          log('animOut','<--');
      });

  }]);
