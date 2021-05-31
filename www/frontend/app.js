var AniMerch = angular.module('AniMerch', ['ngRoute', 'ui.bootstrap.tpls', 'ngAnimate', 'ngTouch']);

AniMerch.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "frontend/module/home/view/view_home.html", 
                controller: "home_controller",
                resolve: {
                    banners: function (services) {
                        return services.get('home','getBanners');
                    },
                    categories: function (services) {
                        return services.get('home','getCategories');
                    }
                }
            }).otherwise("/home", {
                templateUrl: "frontend/module/home/view/view_home.html", 
                controller: "home_controller"
            });
    }]);