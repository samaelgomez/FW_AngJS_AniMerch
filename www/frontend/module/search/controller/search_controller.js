AniMerch.controller('search_controller', function ($scope, $rootScope, services) {
    $scope.searchProduct = function() {
        if ($scope.searchValue) {
            $rootScope.searchFigures = $scope.searchValue;
            localStorage.setItem('searchFilter', $scope.searchValue);
            localStorage.setItem('category', 'All');
            location.replace('#/shop');
        } else {
            localStorage.removeItem('searchFilter');
            localStorage.setItem('category', 'All');
        }
        window.location.reload();
    }
});