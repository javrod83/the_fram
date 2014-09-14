'use strict';
angular.module('theFarmApp')
.factory('FarmServices',['$http','$q',function($http,$q){

	var Collection = function(data) {
        angular.extend(this, data);
    };


    Collection.model = {
    	config : {},
    	data   : {},
    	init : false
    }

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

    Collection.getData = function(url,tid,filename) {
        var deferred = $q.defer();
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

    Collection.getStatus = function(url,tid,filename) {
        var deferred = $q.defer();
        return $http.get(url+tid+'/'+filename).then(function(response) {
            if (response.status === 200) {
                deferred.resolve(response.data);
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

    Collection.postVote = function(url,tid,payload) {
        var deferred = $q.defer();

        //http://vote.farm.scrnz.com/v?u=<UID>&t=<TOKEN>&vi=<VID>&v=<SELECTION>
        return $http.post(url+'?u='+payload.uid+'&t='+payload.token+'&vi='+payload.vid+'&v='+payload.selection,{}).then(function(response) {
            if (response.status === 200) {
                deferred.resolve(response.data);
            } else {
                deferred.reject({
                    'errorMsg': 'vote unsuccessfull ! '
                });
            }
            return deferred.promise;
        });
    };

    return Collection;

}])