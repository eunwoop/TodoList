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
        this.title = document.getElementById('title');
        this.weeklyView = document.getElementById('weekly-view');
        this.weeklyDay = document.querySelectorAll('.day-in-weekly');

        this.getWeekDom();

        this.todoInput = new TodoInput();
        this.todoCount = new TodoCount();
        this.todoList = new TodoList(this.todoListElem, this.weekUlElements, user);
        this.tab = new Tab();

        this.title.innerHTML += '\n';
        this.title.innerHTML += getCurrentDate();
    }

    getWeekDom() {
        const idPrefix = 'weekly-todo-list-';
        this.weekUlElements = [];
        const WEEK_STRING = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        WEEK_STRING.forEach(element => {
            this.weekUlElements.push(document.getElementById(idPrefix + element));
        });
    }

    async init() {
        try {
            // set callbacks.
            this.setCallbacks();

            // get data from server
            this.todoListData = await getDataFromServer();
            this.todoList.setState(this.todoListData);
        } catch (e) {
            const failmessage = document.getElementById('error-message');
            failmessage.innerHTML = e;
            failmessage.style.visibility = 'visible';
            console.error(e);
        }
    }

    setCallbacks() {
        this.todoList.setOnDataChangedCallback(() => {
            console.log("onDataChanged !");
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

        //TODO: move this to Tab.js
        this.tab.setOnTabClickListener((e, tabType) => {
            switch(tabType) {
                case TAB_TYPE.ALL_TAB:
                case TAB_TYPE.TODAY_TAB:
                case TAB_TYPE.TOMOR_TAB:
                    this.todoListElem.style.visibility = 'visible';
                    this.weeklyView.style.visibility = 'collapse';
                    break;
                case TAB_TYPE.WEEKLY_TAB:
                    this.todoListElem.style.visibility = 'collapse';
                    this.weeklyView.style.visibility = 'visible';
                    break;
                default:
                    break;
            }

            this.todoList.onTabChanged(tabType);
            const tablinks = document.getElementsByClassName('tablinks');
            [...tablinks].forEach(element => {
                element.className = element.className.replace(' active', '');
            });
            e.currentTarget.className += ' active';
        });

        this.editButton.onclick = () => {
            this.todoListElem.dispatchEvent(new Event('edit'));
        }
        this.todoListElem.addEventListener('edit', () => {
            this.todoList.toggleEditMode();
        })
    }
}



//validator test
// new TodoList(todoElement, null);
// new TodoList(todoElement, undefined);
// new TodoList(todoElement, 3);
// new TodoList(todoElement, [{no: 'textfield'}]);
// const testTodo = new TodoList(todoElement, [{text: 'Netflix 시청하기',isCompleleted: true,}]);
// testTodo.setState([{text: 'Netflix 시청하기', isCompleleted: 'hello',}]);