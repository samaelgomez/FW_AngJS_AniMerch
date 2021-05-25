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

function printHeaderButton() {
    printHeaderAuthButton().then (result => {
        let logButton = document.getElementById('navContainer');
        logButton.innerHTML = result;
    
        let registerButton = document.getElementById("registerButton");
        let loginButton = document.getElementById("loginButton");
        let logoutButton = document.getElementById("logoutButton");
        let recoverButton = document.getElementById("recoverButton");
        let sendRecoverButton = document.getElementById("sendRecoverButton");
        let updatePassButton = document.getElementById("updatePassButton");
        
        if(registerButton !== null) {
            registerButton.addEventListener("click",(e)=>{
                const form = document.querySelector('form#registerForm');
                let formData = "";

                e.preventDefault();
                formData = getFormElements(form);
                register(formData);
            })
        }
    
        if(loginButton !== null) {
            loginButton.addEventListener('click',(e)=>{
                const form = document.querySelector('form#loginForm');
                let formData = "";
        
                e.preventDefault();
                formData = getFormElements(form);
                login(formData);
            })
        }

        if(recoverButton !== null) {
            recoverButton.addEventListener('click',(e)=>{
                $('.authForms').empty();
                $("#formRecoverPass").hide();
                $("#formRecover").show();
            })
        }

        if(sendRecoverButton !== null) {
            sendRecoverButton.addEventListener('click',(e)=>{
                let email = document.getElementById('recoverFormEmail').value;
                friendlyURL('?page=auth&op=recover').then(function(data) {
                    ajaxPromise(data, "POST", {email: email});
                })
            })
        }

        if(updatePassButton !== null) {
            updatePassButton.addEventListener('click',(e)=>{
                let pass = document.getElementById('recoverFormPass').value;
                friendlyURL('?page=auth&op=updatePass').then(function(data) {
                    ajaxPromise(data, "POST", {pass: pass});
                })
            })
        }
        
        if(logoutButton !== null) {
            logoutButton.addEventListener("click",()=>{
                changeSession('logout');
            })
        }
    })
}