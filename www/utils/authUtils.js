function authPetition(petitionType, data) {
    return new Promise((resolve, reject) => {
        ajaxPromise("module/auth/controller/authController.php", "POST", {authPetition: petitionType, data: data})
        .then((result)=>{
            if (result) {
                resolve(result);
            } else {
                reject("Petition error");
            }
        })
    })
}

function changeSession(action, data={}) {
    switch (action) {
        case 'login':
            localStorage.setItem('username', data.username);
            localStorage.setItem('userType', data.type);
            localStorage.setItem('userImage', data.avatar);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('token', data.token);
            break;

        case 'logout':
            localStorage.removeItem('username');
            localStorage.removeItem('userType');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userImage');
            localStorage.removeItem('token');
            break;
    
        default:
            break;
    }
    location.replace('?page=home');
}

function login(formData) {
    authPetition('login', formData)
    .then(result => {
        changeSession('login', {username: result[1].username, type: result[0], avatar: result[1].avatar, email: result[1].email, token: result[2]})
    })
    .catch((e) => {
        console.log(e);
    });
}

function register(formData) {
    authPetition('register', formData)
    .then(result => {
        changeSession('login', {username: result[1][1][1], type: result[0], email: result[1][1][0], token: result[2]})
    })
    .catch((e) => {
        console.log(e);
    });
}

function printHeaderAuthButton() {
    return new Promise(resolve => {
        if(localStorage.getItem('username')) {
            resolve('<li class="nav-item" id="logoutButton"><a class="nav-link">Logout</a></li>');
        } else {
            resolve('<li class="nav-item"><a class="nav-link" href="/?page=login">Login</a></li>');
        }
    })
}