function getProfileFormElements(form) {
    let profileFormUsername = document.getElementById('profileFormUsername').value;
    let profileFormEmail = document.getElementById('profileFormEmail').value;
    let profileFormPassword = document.getElementById('profilePassword').value;

    return [profileFormUsername, profileFormEmail, profileFormPassword];
}

function loadProfilePage() {
    document.getElementById('profileInfo').innerHTML = `
    <img src="view/images/Zoro.png"/>
    <div class="name">
      <h2 id='profileUsername'>${localStorage.getItem('username')}</h2>
      <span id='profileEmail'>${localStorage.getItem('userEmail')}</span>
    </div>`;

    document.getElementById('profileButton').addEventListener('click', () => {
      document.getElementById('profileContentContainer').innerHTML = '';
      document.getElementById('profileContentTitle').innerHTML = '';

      printSettingsProfile().then(result => {
        document.getElementById('profileSettingsSubmit').addEventListener('click', (e) => {
            const form = document.querySelector('form#settingsForm');
            let formData = "";
    
            e.preventDefault();
            formData = getProfileFormElements(form);
            ajaxPromiseNoJSON("module/profile/controller/profile.controller.php", "POST", {action: 'edit', userType: localStorage.getItem('userType'), profileData: formData})
            .then(()=>{
                localStorage.removeItem('userEmail');
                localStorage.setItem('userEmail', formData[1]);
                location.reload();
            })
        })
      });
    });

    ajaxPromiseNoJSON("module/profile/controller/profile.controller.php", "POST", {action: 'list', userType: localStorage.getItem('userType'), username: localStorage.getItem('username')})
    .then((data)=>{
        console.log(data);
    })

}

function validateProfileSettings() {

}

function printSettingsProfile() {
    return new Promise(resolve => {
        let profileContentContainer = document.getElementById('profileContentContainer');
        let profileContentTitle = document.getElementById('profileContentTitle');

        profileContentTitle.innerHTML = 'Edit profile';
        profileContentContainer.innerHTML = `
        <div class="mainContainer">
            <div class="container">
                <form id="settingsForm">
                <div>
                    <label>Name:</label>
                    <input type="text" name="profileUsername" id="profileFormUsername" placeholder="Name" value="${localStorage.getItem('username')}" disabled/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="profileEmail" id="profileFormEmail" placeholder="Email" value="${localStorage.getItem('userEmail')}"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="profilePassword" id="profilePassword" placeholder="Password"/>
                </div>
                <br/>
                <div class="btnBlock">
                    <button type="submit" class="btn" id='profileSettingsSubmit'>Submit</button>
                </div>
                </form>
            </div>
        </div>`
        resolve(true);
    })
}