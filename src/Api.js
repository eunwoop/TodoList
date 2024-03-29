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

async function sendToServer(data) {
    console.log("send to server " + data);
    const url = '/task';
    let response;
    try {
        response = await axios.post(url, data);
        console.log(response);
    } catch(error){
        console.error(error);
    }
    return response.data;
}

/*
* 패치. 일부만 수정
* PATCH /task/{id}
* {
*   "completed": true
* }
*/

function updateData(data) {
    console.log(data);
    const url = `/task/${data.id}`;
    axios.patch(url, data);
}

// GET /task/all
async function getAll() {
    const url = '/task/all';
    const response = await axios.get(url);
    return response;
}


/* 
* 로그인. request body 에 text/plain 으로 taskit-lucky903 전송
* POST /login
*/
async function login(id, password) {
    const url = '/login';
    const response = await axios.post(url, {'user': id, 'pwd': password});
    return response;
}

/*
 * 삭제
 * DELETE /task/{id}
 */
async function deleteFromServer(data) {
    const url = `/task/${data.id}`;
    const response = await axios.delete(url);
    return response;
}

export {login, getAll, updateData, sendToServer, deleteFromServer};
