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
  

    var myAppId = '698019256941090';
    FacebookProvider.init(myAppId);

      $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/userPrompt', {
        templateUrl: 'views/userPrompt.html',
        controller: 'UserPromptCtrl'
      })
      .when('/textContainer', {
        templateUrl: 'views/textContainer.html',
        controller: 'TextContainerCtrl'
      })
      .when('/imageContainer', {
        templateUrl: 'views/imageContainer.html',
        controller: 'ImageContainerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
