const MAX_LIST = 1000;
const todoListElem = document.querySelector('#todo-list');
const todoInput = new TodoInput();
const todoCount = new TodoCount();
const editButton = document.getElementById('edit-button');
const deleteAllButton = document.getElementById('delete-all-button');
const editModeEvent = new Event('edit');
const deleteAllEvent = new Event('deleteAll');


const savedTodoList = getTodoListFromLocalStorage();
const todoList = new TodoList(todoListElem);
todoList.setOnDataChangedCallback(onAppDataChanged);
todoList.setState(savedTodoList);
todoInput.setOnNewDataListener(onDataInput);
editButton.onclick = function () {
    todoListElem.dispatchEvent(editModeEvent);
}
deleteAllButton.onclick = function () {
    const dialog = confirm("모든 할일을 삭제 하시겠습니까? 복구되지 않습니다.");
    if (dialog === true) {
        todoListElem.dispatchEvent(deleteAllEvent);
    }
}
todoList.onDataChanged();

todoListElem.addEventListener('edit', () => {
    todoList.toggleEditMode();
})
todoListElem.addEventListener('deleteAll', () => {
    todoList.setState([]);
});

function onDataInput(inputValue) {
    const newData = {
        id: makeId(),
        text: inputValue,
        isCompleted: false,
    }
    todoList.addData(newData);
    console.log(todoList);
}

function onAppDataChanged() {
    todoList.render();
    todoInput.render();
    todoCount.render(todoList.getListLength(),
        todoList.getCompleteNum());
    setObjectToLocalStorage(todoList.dataList);
}

//validator test
// new TodoList(todoElement, null);
// new TodoList(todoElement, undefined);
// new TodoList(todoElement, 3);
// new TodoList(todoElement, [{no: 'textfield'}]);
// const testTodo = new TodoList(todoElement, [{text: 'Netflix 시청하기',isCompleleted: true,}]);
// testTodo.setState([{text: 'Netflix 시청하기', isCompleleted: 'hello',}]);