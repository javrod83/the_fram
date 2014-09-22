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
    'ngSanitize',
    'ngTouch',
    'ngAnimate',
    'ui.router',
    'anim-in-out'
  ])


  .config(function ($stateProvider, $urlRouterProvider) {
  
     $urlRouterProvider.otherwise('/');

     $stateProvider.state('Main', {
        url: '/', 
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }).state('prompt', {
      url: '/prompt',
      templateUrl: 'views/prompt.html',
      controller: 'PromptCtrl'
    }).state('vote', {
      url: '/vote',
      templateUrl: 'views/vote.html',
      controller: 'VoteCtrl'
    }).state('photo', {
      url: '/photo',
      templateUrl: 'views/photo.html',
      controller: 'PhotoCtrl'
    }).state('text', {
      url: '/text',
      templateUrl: 'views/text.html',
      controller: 'TextCtrl'
    });

/*

      $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve:{
          check:[ 'FarmServices', function(FarmServices) {
            if(FarmServices._initilized()){
              console.log('initialized view #/login');
              window.location.href = '#/login';
            }else{
              console.log('not initialized view #/login');
              window.location.href = '/';
            }
          }]
        }

      })
      .when('/prompt', {
        templateUrl: 'views/prompt.html',
        controller: 'PromptCtrl',
        resolve:{
          check:[ 'FarmServices', function(FarmServices) {
            if(FarmServices._initilized()){
              console.log('initialized view #/prompt');
              window.location.href = '#/prompt';
            }else{
              console.log('not initialized view #/prompt');
              window.location.href = '/';
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
              console.log('ready view #/vote');
              window.location.href = '#/vote';
            }else{
              console.log('not ready view #/vote');
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
              console.log('ready view #/text');
              window.location.href = '#/text';
            }else{
              console.log('not ready view #/text');
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
              console.log('ready view #/photo');
              window.location.href = '#/photo';
            }else{
              console.log('not ready view #/photo');
              window.location.href = '/';
            }
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
*/
  });
