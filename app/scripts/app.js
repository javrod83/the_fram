'use strict';

/**
 * @ngdoc overview
 * @name theFarmApp
 * @description
 * # theFarmApp
 *
 * Main module of the application.
 */
angular
  .module('theFarmApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'facebook'
  ])


  .config(function (FacebookProvider,$routeProvider) {
  

    var myAppId = '698853513524331';
    FacebookProvider.init(myAppId);

      $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/prompt', {
        templateUrl: 'views/prompt.html',
        controller: 'PromptCtrl',
        resolve:{
          check:[ 'FarmServices', function(FarmServices) {
            if(FarmServices._ready()){
              window.location.href = '#/prompt';
            }else{
              window.location.href = '#/prompt';
            }
          }]
        }
      })
      .when('/vote', {
        templateUrl: 'views/vote.html',
        controller: 'VoteCtrl',
        resolve:{
          check:[ 'FarmServices', function(FarmServices) {
            if(FarmServices._ready()){
              window.location.href = '#/vote';
            }else{
              window.location.href = '/';
            }
          }]
        }
      })
      .when('/text', {
        templateUrl: 'views/text.html',
        controller: 'TextCtrl',
        resolve:{
          check:[ 'FarmServices', function(FarmServices) {
            if(FarmServices._ready()){
              window.location.href = '#/text';
            }else{
              window.location.href = '/';
            }
          }]
        }
      })
      .when('/photo', {
        templateUrl: 'views/photo.html',
        controller: 'PhotoCtrl',
        resolve:{
          check:[ 'FarmServices', function(FarmServices) {
            if(FarmServices._ready()){
              window.location.href = '#/photo';
            }else{
              window.location.href = '/';
            }
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
