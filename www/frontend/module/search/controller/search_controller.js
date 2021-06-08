AniMerch.controller('search_controller', function ($scope, $rootScope, services) {
    $scope.searchProduct = function() {
        $rootScope.searchFigures = $scope.searchValue;
        localStorage.setItem('searchFilter', $scope.searchValue);
        location.replace('#/shop');
    }
});