AniMerch.factory("services", ['$http','$q', function ($http, $q) {  
    let serviceBase = '/backend/index.php?page=';
    let obj = {};

        obj.get = function (module, functi) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: serviceBase + module + '&op=' + functi
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function(data) {
                deferred.reject(data);
            });
            return promise;
        };

        obj.get = function (module, functi, param) {
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                  method: 'POST',
                  url: serviceBase + module + '&op=' + functi,
                  data: param
              }).success(function(data) {
                 defered.resolve(data);
              }).error(function(data) {
                 defered.reject(data);
              });
            return promise;
        };

        obj.post = function (module, option) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                  method: 'POST',
                  url: serviceBase + module + '&op=' + option
              }).success(function(response) {
                 defered.resolve(response);
              }).error(function(error) {
                 defered.reject(error);
              });
            return promise;
          };
        
    return obj;
}]);