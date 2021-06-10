AniMerch.controller('auth_controller', function($scope, $location, services_auth, services) {
    if (localStorage.updatePass) {
        $scope.toggleAuth = false;
        $scope.showRecoverPass = true;
        $scope.showAuthForms = false;
    } else {
        $scope.toggleAuth = true;
        $scope.showRecover = false;
        $scope.showRecoverPass = false;
        $scope.showAuthForms = true;
    }

    $scope.registerButton = function() {
        const form = document.querySelector('form#registerForm');
        let formData = "";

        formData = services_auth.getFormElements(form);
        services_auth.register(formData);
    };

    $scope.loginButton = function() {
        const form = document.querySelector('form#loginForm');
        let formData = "";

        formData = services_auth.getFormElements(form);
        services_auth.login(formData);
    };

    $scope.recoverButton = function() {
        $scope.showAuthForms = false;
        $scope.showRecover = true;
    };

    $scope.sendRecoverButton = function() {
        let email = document.getElementById('recoverFormEmail').value;
        services.get('auth', 'recover', {email: email})
        .then((data)=>{
            if (data !== '') {
                toastr.success('An email has been sent to your address');
                $scope.showAuthForms = true;
                $scope.showRecover = false;
            } else {
                if (data == 'empty') {
                    toastr.error('That email has not been registered yet');
                } else {
                    toastr.error('You are not allowed to change that password');
                }
            }
        })
    };

    $scope.sendUpdatePassButton = function() {
        let pass = document.getElementById('recoverFormPass').value;
        let url = $location.path().split('/');
        services.get('auth', 'updatePass', {pass: pass, token: url[2]})
        .then(()=>{
            toastr.success('Your password has been changed successfully');
            $scope.showAuthForms = true;
            $scope.toggleAuth = true;
            $scope.showRecoverPass = false;
            localStorage.removeItem('updatePass');
            location.replace('#/auth');
        })
    };

    $scope.toggleForm = function(form) {
        if (form == 'register') {
            let newActiveTab = angular.element(document.querySelector('#reg'));
            newActiveTab.addClass('show');
            newActiveTab.addClass('active');
            $scope.toggleAuth = true;
        } else {
            let newActiveTab = angular.element(document.querySelector('#log'));
            newActiveTab.addClass('show');
            newActiveTab.addClass('active');
            $scope.toggleAuth = false;
        }
    };

    $scope.socialLogin = function(type) {
        var config = {
            apiKey: apiKeySL,
            authDomain: authDomainSL,
            databaseURL: databaseURLSL,
            projectId: projectIdSL,
            storageBucket: storageBucketSL,
            messagingSenderId: messagingSenderIdSL,
            appId: appIdSL,
            measurementId: measurementIdSL
        };
           
        firebase.initializeApp(config);
    
        if (type == 'google') {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
        
            var authService = firebase.auth();
    
            authService.signInWithPopup(provider)
                .then(function(result) {
                    services.get('auth', 'socialLogin', {data: [result.user.displayName, result.user.email, result.user.photoURL, 'google']})
                    .then(()=>{
                        services_auth.changeSession({username: result.user.displayName, type: 'client', avatar: result.user.photoURL, email: result.user.email, token: result.user.refreshToken})
                        localStorage.removeItem('searchFilter');
                        localStorage.removeItem('category');
                        window.location.reload();
                    })
                })
                .catch(function(e) {
                    console.log(e);
                });
        } else {
            var provider = new firebase.auth.GithubAuthProvider();
            var authService = firebase.auth();
    
            authService.signInWithPopup(provider)
            .then(function(result) {
                services.get('auth', 'socialLogin', {data: [result.user.displayName, result.user.email, result.user.photoURL, 'github']})
                .then(()=>{
                    services_auth.changeSession({username: result.user.displayName, type: 'client', avatar: result.user.photoURL, email: result.user.email, token: result.user.refreshToken})
                    localStorage.removeItem('searchFilter');
                    localStorage.removeItem('category');
                    window.location.reload();
                })
            })
            .catch(function(e) {
                console.log(e);
            });
        }
    };
});