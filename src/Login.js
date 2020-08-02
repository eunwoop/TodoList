import {login} from './Api';

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
        failmessage.innerHTML =  'login 에 실패 했습니다. 다시 시도해 주세요.';
        failmessage.style.visibility = 'visible';
        failmessage.style.color = 'red';
        failmessage.style.display = 'block';
        failmessage.style.textAlign = 'center';
        console.error(e);
    }
}
