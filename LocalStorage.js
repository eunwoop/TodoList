const LocalStorage = window.localStorage;
const KEY_TODO_LIST = 'todolist';

function setObjectToLocalStorage(obj) {
    console.log('setTodoList');
    const str = JSON.stringify(obj);
    LocalStorage.setItem(KEY_TODO_LIST, str);
}

function getTodoListFromLocalStorage() {
    console.log('getTodoList');
    const items = LocalStorage.getItem(KEY_TODO_LIST);
    let list = [];
    console.log(items);
    if (items != null|| items !== undefined) {
        list = JSON.parse(items);
    }
     
    return  list;
}
