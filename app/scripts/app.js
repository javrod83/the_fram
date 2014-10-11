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
    'ui.router'
  ]).config(function ($stateProvider, $urlRouterProvider) {
  
     $urlRouterProvider.otherwise('/land');

     $stateProvider.state('land', {
      url: '/land/:id/:token?qa',
      templateUrl: 'views/land.html',
      controller: 'LandCtrl',
      resolve:{
              FarmServices:'FarmServices',
              initData:function(FarmServices) {
                return  FarmServices.getConfig().then(function(res){ 
                  return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']).then(function (res){
                      return FarmServices.getStatus();
                  });
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
