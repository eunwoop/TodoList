/**
 * host ec2-3-14-26-72.us-east-2.compute.amazonaws.com
 * 
 * 조회
 * GET /task/{id}
 * GET /task/all
 * 
 * 생성
 * POST /task
 * {
 *   "message": "test message",
 *   "completed": false
 * }
 * response body 에 생성된 task id 가 내려감
 * 
 * 삭제
 * DELETE /task/{id}
 * 
 * 패치. 일부만 수정
 * PATCH /task/{id}
 * {
 *   "completed": true
 * }
 * 
 */

const SERVER_URL = 'https://ec2-3-14-26-72.us-east-2.compute.amazonaws.com:8080';
function sendToServer(data) {
    console.log("send to server " + data);
    const url = SERVER_URL + '/task';
    console.log(data);
    axios.post(url, data, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    })
        .then(response => console.log(response))
        .catch(error => 
            console.error(error)
        );
}

/*
* 패치. 일부만 수정
* PATCH /task/{id}
* {
*   "completed": true
* }
*/

function updateData(data) {
    const url = SERVER_URL + '/task/' + data.id;
    axios.patch(url, data);
}

// GET /task/all
async function getAll() {
    const url = SERVER_URL + '/task/all';
    const response = await axios.get(url);
    return response;
}


/* 
* 로그인. request body 에 text/plain 으로 taskit-lucky903 전송
* POST /login
*/
async function login(id, password) {
    const url = SERVER_URL + '/login';
    const response = await axios.post(url, {'user': id, 'pwd': password});
    return response;
}

function deleteList() {

}

export {login, getAll, updateData,sendToServer};