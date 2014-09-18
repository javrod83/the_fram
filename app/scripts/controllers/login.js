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
    'Facebook',
    'FarmServices',
   function ($scope, $timeout, Facebook, FarmServices) {
// Define user empty data :/
          
      $scope.user = {};
      console.log(FarmServices.data);
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

      $scope.show = FarmServices.config.social;


      $scope.network = {
            fbSocial :function (data){
            
                FarmServices._saveSocial({
                  id: 'fb',
                  network: 'facebook',
                  token: 'facebookfacebookfacebookfacebookfacebook'
                });
               window.location.href = '#/prompt';
              } , 
            twSocial : function (){

              FarmServices._saveSocial({
                  id: 'tw',
                  network: 'twitter',
                  token: 'twittertwittertwittertwittertwittertwitter'
                });
              window.location.href = '#/prompt';
          }, 
            gSocial :function () {

              FarmServices._saveSocial({
                id: 'g',
                network: 'google',
                token: 'googlegooglegooglegooglegooglegooglegoogle'
              });
              window.location.href = '#/prompt';
          } 
        };




      // Defining user logged status
      $scope.logged = true;
      
      // And3 some fancy flags to display messages upon user status change
      $scope.byebye = false;
      $scope.salutation = false;
      
      $scope.footerImages = ['rabbit','hen', 'field_login'];
      $scope.showBarn = false;

      $scope.$watch(function() {
          return Facebook.isReady();
        }, function(newVal) {
          if (newVal) { $scope.facebookReady = true;}
        }
      );




      



      


      

      
      /**
       * IntentLogin
      */
      $scope.IntentLogin = function() {
        Facebook.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            $scope.logged = true;
            $scope.me(); 
          }
          else
           { $scope.login();}
        });
      };
      
      /**
       * Login
       */
       $scope.login = function() {
         Facebook.login(function(response) {
          if (response.status === 'connected') {
            $scope.logged = true;
            $scope.me();
          }
        
        });
       };
       
       /**
        * me 
        */
        $scope.me = function() {
          Facebook.api('/me', function(response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
              $scope.user = response;
            });
            
          });
        };
      
      /**
       * Logout
       */
      $scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.logged = false;  
          });
        });
      };
      
      /**
       * Taking approach of Events :D
       */
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status === 'connected') {
         //$scope.networks['fbSocial'](data);
        } else {

        }
      });

  }]);