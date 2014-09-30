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
  
     $urlRouterProvider.otherwise('/prompt');

     $stateProvider.state('prompt', {
      url: '/prompt/:id/:token?qa',
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
    }).state('image', {
      url: '/image',
      templateUrl: 'views/image.html',
      controller: 'ImageCtrl',
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
