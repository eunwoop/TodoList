import { TodoCount } from './TodoCount';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { getCurrentDate } from './Date';
import { getAll } from './Api';

async function getDataFromServer() {
    let serverTodoList = await getAll();
    console.log(serverTodoList);
    return serverTodoList.data;
}

export class App {
    constructor(user) {
        this.user = user;
        this.todoListElem = document.querySelector('#todo-list');
        this.editButton = document.getElementById('edit-button');
        this.deleteAllButton = document.getElementById('delete-all-button');
        this.title = document.getElementById('title');

        this.todoInput = new TodoInput();
        this.todoCount = new TodoCount();

        this.title.innerHTML += ' ';
        this.title.innerHTML += getCurrentDate();
    }

    async init() {
        try {
            let savedTodoList;
            savedTodoList = await getDataFromServer();
            this.todoList = new TodoList(this.todoListElem, this.user);

            console.log(this.todoList);

            this.todoList.setOnDataChangedCallback(() => {
                this.todoList.render();
                this.todoInput.render();
                this.todoCount.render(this.todoList.getListLength(),
                        this.todoList.getCompleteNum());
                    //setObjectToLocalStorage(todoList.dataList);
            });
            this.todoList.setState(savedTodoList);
            this.todoInput.setOnNewDataListener((inputValue, date) => {
                const newData = {
                    text: inputValue,
                    isCompleted: false,
                    createdBy: this.user,
                    dueDate: date,
                }
                this.todoList.addData(newData);
                console.log(this.todoList);
            });
            this.todoList.onDataChanged();

            this.editButton.onclick = () => {
                this.todoListElem.dispatchEvent(new Event('edit'));
            }
            this.deleteAllButton.onclick = () => {
                const dialog = confirm("모든 할일을 삭제 하시겠습니까? 복구되지 않습니다.");
                if (dialog === true) {
                    this.todoListElem.dispatchEvent(new Event('deleteAll'));
                }
            }

            this.todoListElem.addEventListener('edit', () => {
                this.todoList.toggleEditMode();
            })
            this.todoListElem.addEventListener('deleteAll', () => {
                this.todoList.setState([]);
                //TODO: delete everything.
            });
        } catch (e) {
            const failmessage = document.getElementById('error-message');
            failmessage.innerHTML = e;
            failmessage.style.visibility = 'visible';
            console.error(e);
        }
    }
}

//validator test
// new TodoList(todoElement, null);
// new TodoList(todoElement, undefined);
// new TodoList(todoElement, 3);
// new TodoList(todoElement, [{no: 'textfield'}]);
// const testTodo = new TodoList(todoElement, [{text: 'Netflix 시청하기',isCompleleted: true,}]);
// testTodo.setState([{text: 'Netflix 시청하기', isCompleleted: 'hello',}]);