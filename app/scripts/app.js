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




function viewportWidth()
  {
    return (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) );
//    return (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * window.devicePixelRatio);
  }
function viewportHeight()
  {
    return (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) );
//    return (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * window.devicePixelRatio);
  }


function getZoom(area,originalWidth)
  {
    return  ((viewportWidth()*area)/originalWidth)
  }

function getWoodZoom()
  {
      var woodArea = 0.89 ; 
      var woodActualWidth = 394 ;
      return getZoom(woodArea,woodActualWidth);
  }

 
function getLogoZoom()
  {
      var logoArea = 0.50 ; 
      var logoActualWidth = 391;
      return getZoom(logoArea,logoActualWidth);
  }


function getHenZoom()
  {
    var HenArea = 0.85;
    var henActualWidth = 354 ;
    return getZoom(HenArea,henActualWidth);
  }

function getRabbitZoom()
  {
    var rabbitArea = 0.35;
    var rabbitActualWidth = 171 ;
    return getZoom(rabbitArea,rabbitActualWidth);
  }

function getRabbitBackZoom()
  {
    var rabbitArea = 1;
    var rabbitActualWidth = 454 ;
    return getZoom(rabbitArea,rabbitActualWidth);
  }


function getFooterBackZoom()
  {
    var fieldArea = 0.7;
    var footerActualWidth = 311 ;
    return getZoom(fieldArea,footerActualWidth);
  }

function getBoardZoom()
  {
    var boardArea = 0.85;
    var boardActualWidth = 440 ;
    return getZoom(boardArea,boardActualWidth);

  }

function getFrameZoom()
  {
    var frameArea = 0.85;
    var frameActualWidth = 440 ;
    return getZoom(frameArea,frameActualWidth);

  }

function printviewPortData()
  {
      console.log('viewport data:');
      console.log('---------------------------');
      console.log('  w: '+viewportWidth()+' h: '+viewportHeight());
      console.log(' pr: '+window.devicePixelRatio+' rw: '+(viewportWidth()*window.devicePixelRatio)+' rh: '+(viewportHeight()*window.devicePixelRatio));
      console.log(' wZ: '+getWoodZoom());
      console.log('iwZ: '+getInvertedWoodZoom());
      console.log('wNW: '+getWoodZoom()*woodActualWidth);
  }


  //the ios 7 background isue fix

 var sriteSize = '986p× 5720px' ;
function isInSprite()
  {
    var currBackPos = $(this).css('background-position') ;

    return ( currBackPos !== '0% 0%' && currBackPos !== '0px 0px, 0px 0px' ) 
  }

  function ios7Fix()
    {
      var x = $('*').filter(isInSprite);
     $(x).each(function(i,e){
        $(e).css('background-size',sriteSize);
      })
    }