import {login} from './Network';

const loginButton = document.getElementById('login-button');
const id = document.getElementById('id');
const password = document.getElementById('password');

loginButton.onclick = async function () {
    try {
        const result = await login(id.value, password.value);
        if (result.status === 200) {
            window.location.href = './index.html?id=' + id.value;
        }
    } catch(e){
        const failmessage = document.getElementById('error-message');
        failmessage.innerHTML =  'login 에 실패 했다 누구냐 너는!!';
        failmessage.style.visibility = 'visible';
        console.error(e);
    }
}
