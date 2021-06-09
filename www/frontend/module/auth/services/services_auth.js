AniMerch.factory("services_auth", ['services', function (services) {
    var service = {getFormElements: getFormElements, register: register, login: login, changeSession: changeSession};
    return service;

    function getFormElements(form) {
        const formData = new FormData(form);
        const pairs = [];
        for (const [_name, value] of formData) {
            pairs.push(value);
        }

        let userType = pairs[0].split('@')[1].split('.')[0];

        switch (userType) {
            case 'shop':
                return ['shop', pairs];
        
            default:
                return ['client', pairs];
        }
    }

    function authPetition(petitionType, formData) {
        return new Promise((resolve, reject) => {
            services.get('auth', 'auth', {authPetition: petitionType, data: formData})
            .then((result)=>{
                if (result) {
                    resolve(result);
                } else {
                    reject("Petition error");
                }
            })
        })
    }

    function changeSession(data={}) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('userType', data.type);
        localStorage.setItem('userImage', data.avatar);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('token', data.token);
        location.replace('#/home');
    }

    function login(formData) {
        authPetition('login', formData)
        .then(result => {
            if (result[1][0].activated == 1) {
                changeSession({username: result[1][0].username, type: result[0], avatar: result[1][0].avatar, email: result[1][0].email, token: result[2]});
                localStorage.removeItem('searchFilter');
                localStorage.removeItem('category');
                window.location.reload();
            } else {
                toastr.error('Your user has not been activated or does not exist!');
            }
            
        })
        .catch((e) => {
            console.log(e);
        });
    }
    
    function register(formData) {
        authPetition('register', formData)
        .then(result => {
            toastr.success('You have received an activation email!');
        })
        .catch((e) => {
            console.log(e);
        });
    }
}]);