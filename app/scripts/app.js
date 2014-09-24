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
  ]).config(function ($stateProvider, $urlRouterProvider) {
  
     $urlRouterProvider.otherwise('/login');

     $stateProvider.state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          resolve:{
              FarmServices:'FarmServices',
              initData:function(FarmServices) {
                    return  FarmServices.getConfig().then(function(res){ 
                        return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
                    });
              }
          }
    }).state('prompt', {
      url: '/prompt',
      templateUrl: 'views/prompt.html',
      controller: 'PromptCtrl',
      resolve:{
              FarmServices:'FarmServices',
              initData:function(FarmServices) {
                    return  FarmServices.getConfig().then(function(res){ 
                        return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
                    });
              }
          }
    }).state('vote', {
      url: '/vote',
      templateUrl: 'views/vote.html',
      controller: 'VoteCtrl',
      resolve:{
              FarmServices:'FarmServices',
              initData:function(FarmServices) {
                    return  FarmServices.getConfig().then(function(res){ 
                        return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
                    });
              }
          }
    }).state('photo', {
      url: '/photo',
      templateUrl: 'views/photo.html',
      controller: 'PhotoCtrl',
      resolve:{
              FarmServices:'FarmServices',
              initData:function(FarmServices) {
                    return  FarmServices.getConfig().then(function(res){ 
                        return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
                    });
              }
          }
    }).state('text', {
      url: '/text',
      templateUrl: 'views/text.html',
      controller: 'TextCtrl',
      resolve:{
              FarmServices:'FarmServices',
              initData:function(FarmServices) {
                    return  FarmServices.getConfig().then(function(res){ 
                        return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
                    });
              }
          }
    });
    

  });
