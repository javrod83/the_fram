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

      if (!FarmServices.flags.initialized){ 
        window.location.href = '#/';  
      }
          
      $scope.user = {};

      $scope.title = FarmServices.data.dictionary.login.title;

      $scope.facebook = {
        title : FarmServices.data.dictionary.login.facebook,
        error : FarmServices.data.dictionary.login.facebook,
      }

      $scope.twitter = {
        title : FarmServices.data.dictionary.login.twitter,
        error : FarmServices.data.dictionary.login.twitter,
      }

      $scope.google = {
        title : FarmServices.data.dictionary.login.google,
        error : FarmServices.data.dictionary.login.google,
      }

      $scope.show = FarmServices.config.social;
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
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;    
          });
        } else {
          $scope.$apply(function() {
            $scope.salutation = false;
            $scope.byebye     = true;
            
            // Dismiss byebye message after two seconds
            $timeout(function() {
              $scope.byebye = false;
            }, 2000);
          });
        }
        
      });


  }]);
