var AniMerch = angular.module('AniMerch', ['ngRoute', 'ui.bootstrap.tpls', 'ngAnimate', 'ngTouch', 'angularUtils.directives.dirPagination']);

AniMerch.run(function($rootScope) {
    $rootScope.toggleLoginButton = true;
    $rootScope.logout = function() {
        localStorage.removeItem('username');
        localStorage.removeItem('userType');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userImage');
        localStorage.removeItem('token');
    }
});

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
            }).when("/auth", {
                templateUrl: "frontend/module/auth/view/view_auth.html", 
                controller: "auth_controller",
                resolve: {
                }
            }).when("/auth/activate/:token", {
                resolve: {
                    activate: function (services, $route) {
                        return services.get('auth', 'activate', {'token': $route.current.params.token});
                    }
                }
            }).when("/auth/:token", {
                templateUrl: "frontend/module/auth/view/view_auth.html", 
                controller: "auth_controller",
                resolve: {
                    activate: function () {
                        localStorage.setItem('updatePass', 'updatePass');
                    }
                }
            }).otherwise("/home", {
                templateUrl: "frontend/module/home/view/view_home.html", 
                controller: "home_controller"
            });
    }]);