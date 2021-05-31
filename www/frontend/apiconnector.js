AniMerch.factory("services", ['$http','$q', function ($http, $q) {
    let serviceBase = '/backend/index.php?page=';
    let obj = {};

        obj.get = function (module, functi) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: serviceBase + module + '&op=' + functi
            }).success(function(data, status, headers, config) {
                console.log(data);
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.reject(data);
            });
            return promise;
        };
        
    return obj;
}]);