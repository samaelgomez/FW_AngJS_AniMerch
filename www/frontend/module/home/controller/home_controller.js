AniMerch.controller('home_controller', function($scope, $window, banners, categories) {

    let visibleCategories = 3;
    let totalCategories = categories.length;

    $scope.slides = banners;
    $scope.categories = categories.slice(0, visibleCategories);
    $scope.owlOptionsTestimonials = {
        autoPlay: 4000,
        stopOnHover: true,
        slideSpeed: 300,
        paginationSpeed: 600,
        items: 1
    }

    angular.element($window).on('mousewheel', function() {
        let footerHeight = document.getElementById('feet').offsetHeight;
        let position = $window.scrollY + footerHeight;
        let bottom = document.body.scrollHeight - $window.innerHeight;

        if (position >= bottom) {
            if (visibleCategories < totalCategories) {
                visibleCategories += 3;
                $scope.categories = categories.slice(0, visibleCategories);
                $scope.$apply();
            }else {
                angular.element($window).off('mousewheel');
            }
        }
    });
});

AniMerch.directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function(scope) {
            scope.initCarousel = function(element) {
                var defaultOptions = {};
                var customOptions = scope.$eval($(element).attr('data-options'));
                for (var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                var curOwl = $(element).data('owlCarousel');
                if (!angular.isDefined(curOwl)) {
                    $(element).owlCarousel(defaultOptions);
                }
                scope.cnt++;
            };
        }
    };
}).directive('owlCarouselItem', [
    function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element) {
                if (scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }
]);

// $(document).ready(function () {
//     $("#category2").hide();
//     $("#category3").hide();
//     $("#show_even_more").hide();
//     $("body").on("click", "#show_more", function() {
//         $("#category2").show();
//         $("#show_more").hide();
//         $("#show_even_more").show();
//     });
//     $("body").on("click", "#show_even_more", function() {
//         $("#category3").show();
//         $("#show_even_more").hide();
//     });

//     printHeaderButton();
//     loadCarousel();
// });