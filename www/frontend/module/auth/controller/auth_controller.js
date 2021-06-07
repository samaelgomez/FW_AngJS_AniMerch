AniMerch.controller('auth_controller', function($scope, services_auth, services) {
    services_auth.printHeaderButton();
    $scope.toggleAuth = true;
    $scope.showRecover = false;
    $scope.showRecoverPass = false;
    $scope.showAuthForms = true;

    let logoutButton = document.getElementById("logoutButton");
    let sendRecoverButton = document.getElementById("sendRecoverButton");
    let updatePassButton = document.getElementById("updatePassButton");
    let googleLoginButton = document.getElementById("googleLoginButton");
    let githubLoginButton = document.getElementById("githubLoginButton");

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
        .then(()=>{
            alert('An email has been sent to your address');
        })
    };

    // if(sendRecoverButton !== null) {
    //     sendRecoverButton.addEventListener('click',(e)=>{
    //         let email = document.getElementById('recoverFormEmail').value;
    //         console.log(email);
    //         friendlyURL('?page=auth&op=recover').then(function(data) {
    //             ajaxPromise(data, "POST", {email: email});
    //         })
    //     })
    // }

    // if(updatePassButton !== null) {
    //     updatePassButton.addEventListener('click',(e)=>{
    //         let pass = document.getElementById('recoverFormPass').value;
    //         friendlyURL('?page=auth&op=updatePass').then(function(data) {
    //             ajaxPromise(data, "POST", {pass: pass});
    //         })
    //     })
    // }

    if(googleLoginButton !== null) {
        googleLoginButton.addEventListener('click',(e)=>{
            socialLogin('google');
        })
    }

    if(githubLoginButton !== null) {
        githubLoginButton.addEventListener('click',(e)=>{
            socialLogin('github');
        })
    }
    
    if(logoutButton !== null) {
        logoutButton.addEventListener("click",()=>{
            changeSession('logout');
        })
    }

    $scope.toggleForm = function(form) {
        if (form == 'register') {
            let newActiveTab = angular.element( document.querySelector('#reg'));
            newActiveTab.addClass('show');
            newActiveTab.addClass('active');
            $scope.toggleAuth = true;
        } else {
            let newActiveTab = angular.element( document.querySelector('#log'));
            newActiveTab.addClass('show');
            newActiveTab.addClass('active');
            $scope.toggleAuth = false;
        }
    };
});

// function socialLogin(type) {
//     var config = {
//         apiKey: apiKeySL,
//         authDomain: authDomainSL,
//         databaseURL: databaseURLSL,
//         projectId: projectIdSL,
//         storageBucket: storageBucketSL,
//         messagingSenderId: messagingSenderIdSL,
//         appId: appIdSL,
//         measurementId: measurementIdSL
//     };
       
//     firebase.initializeApp(config);

//     if (type == 'google') {
//         var provider = new firebase.auth.GoogleAuthProvider();
//         provider.addScope('email');
    
//         var authService = firebase.auth();

//         authService.signInWithPopup(provider)
//             .then(function(result) {
//                 friendlyURL('?page=auth&op=socialLogin').then(function(data) {
//                     ajaxPromise(data, "POST", {data: [result.user.displayName, result.user.email, result.user.photoURL, 'google']})
//                     .then(result => {
//                         changeSession('login', {username: result.username, type: 'client', avatar: result.avatar, email: result.email, token: result.token})
//                     })
//                     .catch((e) => {
//                         console.log(e);
//                     });
//                 })
//             })
//             .catch(function(e) {
//                 console.log(e);
//             });
//     } else {
//         var provider = new firebase.auth.GithubAuthProvider();
//         var authService = firebase.auth();

//         authService.signInWithPopup(provider)
//         .then(function(result) {
//             friendlyURL('?page=auth&op=socialLogin').then(function(data) {
//                 console.log(result.user);
//                 ajaxPromise(data, "POST", {data: [result.user.displayName, result.user.email, result.user.photoURL, 'github']})
//                 .then(result => {
//                     changeSession('login', {username: result.username, type: 'client', avatar: result.avatar, email: result.email, token: result.token})
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                 });
//             })
//         }).catch(function(e) {
//             console.log(e);
//         })
//     }
// }