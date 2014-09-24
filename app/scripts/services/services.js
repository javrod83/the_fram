'use strict';
angular.module('theFarmApp')
.factory('FarmServices',['$http','$q',function($http,$q){
      
      //log
      var modName = 'FarmServices';

      function log(method,msg)
        {
          console.log('['+modName+']: '+method+' : '+msg);
        }


    var Collection = {
        configUrl : 'api',
        config : {},
        data : {},
        lastStatusId : -1,
        lastVoteId : -1,
        status : {
            current : {
                id : -1
            },
            last : {
                id: -1
            }
        },
        timeStatus : {
            lastStatus : -1,
            lastTerritory : -1 
        },
        flags : {
            loged : false,
            initialized : false
        },
        delayedGetStatus : function(callBack){
            log('delayedGetStatus','<--');
            setTimeout(function() {
                log('delayedGetStatus','callBack');
                callBack(Collection.getStatus()) ; 
            }, Collection.status.current.interval*1000);
        },
        updatedStatus : function (){
            log('updatedStatus',(Collection.status.current.id > -1  && Collection.status.current.id > Collection.status.last.id));
            return (Collection.status.current.id > -1  && Collection.status.current.id > Collection.status.last.id);    
        },
        getConfig : function() {
            log('getConfig','<--');
            var deferred = $q.defer();
            return $http.get(Collection.configUrl+'/config.json').then(function(response) {

            //  console.log(response);
                if (response.status === 200) {
                    Collection.config = response.data;
                   
                    log('getConfig','success');
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'config.json file unreacheable ! '
                    });
                }
                return deferred.promise;
            },function(err){
                log('getConfig','fail');
            });
        },
        getData : function() {
            log('getData','<--');
            var deferred = $q.defer();

            var url      = Collection.config.urls.base;
            var tid      = Collection.config.tid;
            var filename = Collection.config.jsons['territory-data'];
            
            log('getData','url: '+url+tid+'/'+filename);

            return $http.get(url+tid+'/'+filename).then(function(response) {
                log('getData','success');
                if (response.status === 200) {
                    Collection.data = response.data;
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'data file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            },function(err){
                log('getData','fail');
                console.log(err);
            });
        },
        getStatus : function() {
            log('getStatus','<--');
            var deferred = $q.defer();

            var url = Collection.config.urls.base;
            var tid = Collection.config.tid;
            var filename = Collection.config.jsons.status; 
 
            log('getData','status is '+((Collection.status.current.id === -1)? 'original ':'new: '+ Collection.status.current['status-url']));

               var backedUrl =  (Collection.status.current.id === -1)? url+tid+'/'+filename : Collection.status.current['status-url'];            
                
            return $http.get(backedUrl).then(function(response) {
                log('getData','success');
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    Collection.status.last = Collection.status.current; 
                    Collection.status.current = response.data; 
                    console.log(Collection.status);

                } else {
                    deferred.reject({
                        'errorMsg': 'status file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            },function(err){
                log('getData','success');
                console.log(err);
            });
        },
        getPhotoMock : function() {
            log('getPhotoMock','<--');
            var deferred = $q.defer();

            var url      = 'api/' ;
            var tid      = '9' ;
            var filename = 'status_photo.json' ; 

            return $http.get(url+tid+'/'+filename).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    Collection.status.current = response.data; 

                } else {
                    deferred.reject({
                        'errorMsg': 'status file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        getTextMock : function() {
            log('getTextMock','<--');
            var deferred = $q.defer();

            var url = 'api/';
            var tid = '9';
            var filename = 'status_text.json'; 

            return $http.get(url+tid+'/'+filename).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    Collection.status.current = response.data; 

                } else {
                    deferred.reject({
                        'errorMsg': 'status file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        clean: function ()
        {
            
                Collection.configUrl     = 'api';
                Collection.config        = {};
                Collection.data          = {};
                Collection.lastStatusId  = -1;
                Collection.lastVoteId    = -1;
                Collection.status        = {
                    current  : {
                        id   : -1
                    },
                    last     : {
                        id   : -1
                    }
                };
                Collection.timeStatus = {
                    lastStatus : -1,
                    lastTerritory : -1 
                };
                Collection.flags = {
                    loged : false,
                    initialized : false
                };
            }
        
    };

    return Collection;

}]);