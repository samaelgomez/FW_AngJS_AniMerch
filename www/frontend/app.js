var AniMerch = angular.module('AniMerch', ['ngRoute', 'ui.bootstrap.tpls', 'ngAnimate', 'ngTouch', 'angularUtils.directives.dirPagination']);

AniMerch.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "frontend/module/home/view/view_home.html", 
                controller: "home_controller",
                resolve: {
                    banners: function (services) {
                        return services.get('home', 'getBanners');
                    },
                    categories: function (services) {
                        return services.get('home', 'getCategories');
                    }
                }
            }).when("/shop", {
                templateUrl: "frontend/module/shop/view/view_shop.html", 
                controller: "shop_controller",
                resolve: {
                    products: function (services) {
                        return services.get('shop', 'showProducts', {petition: ' ', username: localStorage.getItem('username')});
                    },
                    brands: function(services) {
                        return services.post('shop', 'getBrands');
                    },
                    franchises: function(services) {
                        return services.post('shop', 'getFranchises');
                    }
                }
            }).otherwise("/home", {
                templateUrl: "frontend/module/home/view/view_home.html", 
                controller: "home_controller"
            });
    }]);