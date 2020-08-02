import { TodoCount } from './TodoCount';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { getCurrentDate, isToday, isTomorrow } from './Date';
import { getAll } from './Api';
import { Tab, TAB_TYPE } from './Tab';

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
        this.todoList = new TodoList(this.todoListElem, user);
        this.tab = new Tab();

        this.title.innerHTML += '\n';
        this.title.innerHTML += getCurrentDate();
    }

    async init() {
        try {
            // set callbacks.
            this.setCallbacks();

             /// get data from server
             this.todoListFromServer = await getDataFromServer();
            this.todoList.setState(this.todoListFromServer);
        } catch (e) {
            const failmessage = document.getElementById('error-message');
            failmessage.innerHTML = e;
            failmessage.style.visibility = 'visible';
            console.error(e);
        }
    }

    setCallbacks() {
        this.todoList.setOnDataChangedCallback(() => {
            this.todoList.render();
            this.todoInput.render();
            this.todoCount.render(this.todoList.getListLength(),
                    this.todoList.getCompleteNum());
                //setObjectToLocalStorage(todoList.dataList);
        });
        this.todoInput.setOnNewDataListener(async (inputValue, date) => {
            const newData = {
                text: inputValue,
                isCompleted: false,
                createdBy: this.user,
                dueDate: date,
            }
            await this.todoList.addData(newData);
            console.log(this.todoList);
        });

        this.tab.setOnTabClickListener((e, tabType) => {
            console.log(tabType);

            switch(tabType) {
                case TAB_TYPE.ALL_TAB:
                    this.todoList.setState(this.todoListFromServer);
                    break;
                case TAB_TYPE.TODAY_TAB:
                    this.todoList.setState(this.todoListFromServer.filter(
                        element => isToday(element.dueDate)));
                    break;
                case TAB_TYPE.TOMOR_TAB:
                    this.todoList.setState(this.todoListFromServer.filter(
                        element => isTomorrow(element.dueDate)));
                    break;
                default:
                    this.todoList.setState(this.todoListFromServer);
                    break;

            }
        });

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

    }
}

//validator test
// new TodoList(todoElement, null);
// new TodoList(todoElement, undefined);
// new TodoList(todoElement, 3);
// new TodoList(todoElement, [{no: 'textfield'}]);
// const testTodo = new TodoList(todoElement, [{text: 'Netflix 시청하기',isCompleleted: true,}]);
// testTodo.setState([{text: 'Netflix 시청하기', isCompleleted: 'hello',}]);