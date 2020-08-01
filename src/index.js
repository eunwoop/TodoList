import {App} from './App.js'

const user = GetURLParameter('id');
console.log(user);
console.log(decodeURI(user));
const app = new App(user);
app.init();

function GetURLParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        const sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
