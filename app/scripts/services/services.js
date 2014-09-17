'use strict';
angular.module('theFarmApp')
.factory('FarmServices',['$http','$q',function($http,$q){

    var Collection = {
        config : {},
        data : {},
        registration : {
            token : -1,
            uid : -1,
        },
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
            logedIn : false,
            initialized : false
        },
        _saveVote : function(vid){
            localStorage.vid = vid;
        },
        _allReadyVoted : function (){
            if (localStorage.vid === undefined){ 
                return false;
            }else{
                return (Collection.status.current.frame.vote.vid  === localStorage.vid );
            }
        },
        _loadLocalLogin : function(){
            if (localStorage.token !== undefined){
                Collection.registration.token = localStorage.token;
                Collection.registration.uid   = localStorage.uid;
                Collection.flags.logedIn       = true ;
                return true;
            }else{
                return false
            }
        },
        _saveLocalLogin : function(token,uid){
            localStorage.token = token ;
            localStorage.uid   = uid; 
        },
        _setStatusReloadInterval : function(interval,callBack){
            setTimeout(function() {
                callBack(Collection.getStatus()) ; 
            }, interval*1000);
        },
        _setRegionReloadInterval : function (interval){
             setTimeout(function() {
               Collection.getData();
            }, interval*1000);
        },
        _logued :  function(){
            return (Collection.token !== -1 );
        },
        _ready : function (){
            return Collection.flags.logedIn === Collection.flags.initialized ;
        },
        _updated : function (){
            return (Collection.status.current.id > -1  && Collection.status.current.id > Collection.status.last.id);    
        },
        getConfig : function(url) {
            var deferred = $q.defer();
            return $http.get(url+'/config.json').then(function(response) {

            //  console.log(response);
                if (response.status === 200) {
                    Collection.config = response.data;
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'config.json file unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        getData : function() {
            var deferred = $q.defer();

            var url      = Collection.config.urls.base;
            var tid      = Collection.config.tid;
            var filename = Collection.config.jsons['territory-data'];

            return $http.get(url+tid+'/'+filename).then(function(response) {
                if (response.status === 200) {
                    Collection.data= response.data;
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'data file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        getStatus : function() {
            var deferred = $q.defer();

            var url = Collection.config.urls.base;
            var tid = Collection.config.tid;
            var filename = Collection.config.jsons.status; 

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
        register : function(url,tid,payload) {
            var deferred = $q.defer();

            return $http.post(url,payload).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'registration unsuccessfull ! '
                    });
                }
                return deferred.promise;
            });
        },
        vote : function(payload) {
            var deferred = $q.defer();
            var url = Collection.config.urls.vote;
            var uid = Collection.registration.uid;
            var token = Collection.registration.token;

            //http://vote.farm.scrnz.com/v?u=<UID>&t=<TOKEN>&vi=<VID>&v=<SELECTION>
            return $http.post(url+'u='+uid+'&t='+token+'&vi='+payload.vid+'&v='+payload.selection,{}).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'vote unsuccessfull ! '
                    });
                }
                return deferred.promise;
            });
        }
    }

	/*var Collection = function(data) {
        angular.extend(this, data);
    };

    Collection.model = {
    	config       : {},
    	data         : {},
        registration : {
            token        : -1,
            uid          : -1,

        },
        lastStatusId : -1,
        lastVoteId   : -1,
        status       : {
            current : {
                id : -1
            },
            last : {
                id: -1
            }
        }
    };

    Collection.timeStatus = {
        lastStatus    : -1,
        lastTerritory : -1 
    };

    Collection.flags = {
        logedIn     : false,
        initialized : false
    };*/

    /*Collection.saveVote = function(vid)
        {
            localStorage.vid = vid ;
        };

    Collection.allReadyVoted = function ()
        {
            if (localStorage.vid === undefined)
               { 
                    return false;
                }
            else
                {
                    return (Collection.model.status.current.frame.vote.vid  === localStorage.vid );
                }
        };

    Collection.loadLocalLogin = function()
        {
            if (localStorage.token !== undefined)
                {
                    Collection.model.registration.token = localStorage.token;
                    Collection.model.registration.uid   = localStorage.uid;
                    Collection.flags.logedIn            = true ;
                }
        };

    Collection.saveLocalLogin = function(token,uid)
        {
            localStorage.token = token ;
            localStorage.uid   = uid; 
        };

    Collection.setStatusReloadInterval = function(interval,callBack)
        {
            setTimeout(function() {
                callBack(Collection.getStatus()) ; 
                   
            }, interval*1000);
            
        };

    Collection.setRegionReloadInterval = function (interval)
        {
             setTimeout(function() {
               Collection.getData();
                   
            }, interval*1000);
        };

    Collection.logued =  function()
        {
            return (Collection.model.token !== -1 );
        };

    //aplicacion ready ?  
    Collection.ready = function ()
        {
            return Collection.flags.logedIn === Collection.flags.initialized ;
        }; 

    //aplicacion its updated? 
    Collection.updated = function ()
        {
            return (Collection.model.status.current.id > -1  && Collection.model.status.current.id > Collection.model.status.last.id);    
        }; 

    Collection.getConfig = function(url) {
        var deferred = $q.defer();
        return $http.get(url+'/config.json').then(function(response) {

        //	console.log(response);
            if (response.status === 200) {
            	Collection.model.config = response.data;
                deferred.resolve(response.data);
            } else {
                deferred.reject({
                    'errorMsg': 'config.json file unreacheable ! '
                });
            }
            return deferred.promise;
        });
    };

    Collection.getData = function() {
        var deferred = $q.defer();

        var url      = Collection.model.config.urls.base;
        var tid      = Collection.model.config.tid;
        var filename = Collection.model.config.jsons['territory-data'];

        return $http.get(url+tid+'/'+filename).then(function(response) {
            if (response.status === 200) {
            	Collection.model.data= response.data;
                deferred.resolve(response.data);
            } else {
                deferred.reject({
                    'errorMsg': 'data file ['+filename+'] unreacheable ! '
                });
            }
            return deferred.promise;
        });
    };

    Collection.getStatus = function() {

        var deferred = $q.defer();

        var url = Collection.model.config.urls.base;
        var tid = Collection.model.config.tid;
        var filename = Collection.model.config.jsons.status; 

        return $http.get(url+tid+'/'+filename).then(function(response) {
            if (response.status === 200) {
                deferred.resolve(response.data);
                Collection.model.status.current = response.data; 

            } else {
                deferred.reject({
                    'errorMsg': 'status file ['+filename+'] unreacheable ! '
                });
            }
            return deferred.promise;
        });
    };

    Collection.register = function(url,tid,payload) {
        var deferred = $q.defer();

        return $http.post(url,payload).then(function(response) {
            if (response.status === 200) {
                deferred.resolve(response.data);
            } else {
                deferred.reject({
                    'errorMsg': 'registration unsuccessfull ! '
                });
            }
            return deferred.promise;
        });
    };

    Collection.vote = function(payload) {
        var deferred = $q.defer();
        var url = Collection.model.config.urls.vote;
        var uid = Collection.model.registration.uid;
        var token = Collection.model.registration.token;


        //http://vote.farm.scrnz.com/v?u=<UID>&t=<TOKEN>&vi=<VID>&v=<SELECTION>
        return $http.post(url+'u='+uid+'&t='+token+'&vi='+payload.vid+'&v='+payload.selection,{}).then(function(response) {
            if (response.status === 200) {
                deferred.resolve(response.data);
            } else {
                deferred.reject({
                    'errorMsg': 'vote unsuccessfull ! '
                });
            }
            return deferred.promise;
        });
    };*/

    return Collection;

}]);