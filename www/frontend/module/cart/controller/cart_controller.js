AniMerch.controller('cart_controller', function($scope, services, cartProducts) {
    $scope.cartProducts = cartProducts;
    console.log(cartProducts);

    cartProducts.forEach(element => {
        localStorage.setItem(element.figureName + 'Stock', element.stock);
        element.quantity = '1';
        if (angular.element('#subtotalPrice')[0].innerHTML == '?') {
            angular.element('#subtotalPrice')[0].innerHTML = element.price;
            shippingPrice = angular.element('#shippingPrice')[0].innerHTML;
            angular.element('#totalPrice')[0].innerHTML = parseFloat(element.price) + parseFloat(shippingPrice);
        } else {
            subtotal = parseFloat(angular.element('#subtotalPrice')[0].innerHTML);
            total = parseFloat(angular.element('#totalPrice')[0].innerHTML);
            angular.element('#subtotalPrice')[0].innerHTML = subtotal + parseFloat(element.price);
            angular.element('#totalPrice')[0].innerHTML = total + parseFloat(element.price);
        }
    });

    $scope.remove = function() {
        var el = this;
        localStorage.removeItem('cart' + el.cartProduct.figureName);
        window.setTimeout(
            function(){
                angular.element('#' + el.cartProduct.figureName).slideUp('fast', function() { 
                angular.element('#' + el.cartProduct.figureName).remove();
                if(angular.element(".product").length == 0) {
                    angular.element("#cart").html("<br/><h1>No products!</h1>");
                }
                });
            }, 200);
        services.get('cart', 'removeFromCart', {username: localStorage.username, figure: el.cartProduct.figureName});
        subtotal = parseFloat(angular.element('#subtotalPrice')[0].innerHTML);
        total = parseFloat(angular.element('#totalPrice')[0].innerHTML);
        angular.element('#subtotalPrice')[0].innerHTML = subtotal - parseFloat(el.cartProduct.price);
        angular.element('#totalPrice')[0].innerHTML = total - parseFloat(el.cartProduct.price);
    };

    $scope.addQt = function() {
        if (this.cartProduct.quantity + 1 > localStorage.getItem(this.cartProduct.figureName + 'Stock')) {
            toastr.error('No more stock!');
        } else {
            this.cartProduct.quantity++;
            currentValue = parseFloat(angular.element('#' + this.cartProduct.figureName + 'FullPrice')[0].innerHTML)
            angular.element('#' + this.cartProduct.figureName + 'FullPrice')[0].innerHTML = currentValue + parseFloat(this.cartProduct.price) + '€';
            subtotal = parseFloat(angular.element('#subtotalPrice')[0].innerHTML);
            angular.element('#subtotalPrice')[0].innerHTML = subtotal + parseFloat(this.cartProduct.price);
            angular.element('#totalPrice')[0].innerHTML = subtotal + parseFloat(this.cartProduct.price);
        }
    };

    $scope.subQt = function() {
        if (this.cartProduct.quantity > 1) {
            this.cartProduct.quantity--;
            currentValue = parseFloat(angular.element('#' + this.cartProduct.figureName + 'FullPrice')[0].innerHTML)
            angular.element('#' + this.cartProduct.figureName + 'FullPrice')[0].innerHTML = currentValue - parseFloat(this.cartProduct.price) + '€';
            subtotal = parseFloat(angular.element('#subtotalPrice')[0].innerHTML);
            angular.element('#subtotalPrice')[0].innerHTML = subtotal - parseFloat(this.cartProduct.price);
            angular.element('#totalPrice')[0].innerHTML = subtotal - parseFloat(this.cartProduct.price);
        }
    };

    $scope.checkout = function() {
        if (localStorage.username) {
            var LSvalues = [],
            keys = Object.keys(localStorage),
            i = keys.length;
            var QTvalues = [];

            cartProducts.forEach(element => {
                angular.element('#' + element.figureName).slideUp('fast', function() { 
                angular.element('#' + element.figureName).remove();
                });
                angular.element("#cart").html("<br/><h1>Checkout done successfully!</h1>");
            });
            

            while ( i-- ) {
                if (keys[i].startsWith("cart")) {
                    LSvalues.push(localStorage.getItem(keys[i]));
                    localStorage.removeItem(keys[i]);
                }
            }

            i = keys.length;

            while ( i-- ) {
                if (keys[i].endsWith("Stock")) {
                    LSvalues.push(localStorage.getItem(keys[i]));
                    localStorage.removeItem(keys[i]);
                }
            }

            cartProducts.forEach(element => {
                QTvalues = [...QTvalues, [element.figureName, element.quantity]];
            });

            services.get('cart', 'substractStock', {cartFigures: QTvalues});
            services.get('cart', 'purchase', {username: localStorage.username, cartFigures: QTvalues});
        } else {
            toastr.error('You must be logged in before proceeding with the purchase!');
            location.replace('#/auth');
        }
    };
});