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
        controller: 'promptCtrl'
      })
      .when('/text', {
        templateUrl: 'views/text.html',
        controller: 'TextCtrl'
      })
      .when('/photo', {
        templateUrl: 'views/photo.html',
        controller: 'PhotoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
