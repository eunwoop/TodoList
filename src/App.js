import { TodoCount } from './TodoCount';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { getCurrentDate, isToday, isTomorrow } from './Date';
import { getAll } from './Api';
import { Tab, TAB_TYPE } from './Tab';
import { WEEK_STRING } from './Weekly';
import { initTables } from './Table';

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
        this.tableTab = document.getElementById('table-tab');
        this.buttonContainer = document.getElementById('button-container');

        this.getWeekListDom();
        this.todoInput = new TodoInput();
        this.todoCount = new TodoCount();
        this.todoList = new TodoList(this.todoListElem, this.weekUlElements, user);
        this.tab = new Tab();

        // set title
        document.querySelector('#greeting').innerHTML = getCurrentDate();
    }

    getWeekListDom() {
        const idPrefix = 'weekly-todo-list-';
        this.weekUlElements = [];
        WEEK_STRING.forEach(element => {
            this.weekUlElements.push(document.getElementById(idPrefix + element));
        });
    }

    async init() {
        try {
            this.setCallbacks();

            // get data from server
            this.todoListData = await getDataFromServer();
            this.todoList.setState(this.todoListData);
            initTables();
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
            this.todoCount.render(this.todoList.getTodayListLength(),
                this.todoList.getUnCompleteNum());
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
            switch (tabType) {
                case TAB_TYPE.WEEKLY_TAB:
                    this.todoListElem.style.display = 'none';
                    this.weeklyView.style.display = '';
                    this.tableTab.style.display = 'none';
                    this.buttonContainer.style.display = 'block';
                    break;
                case TAB_TYPE.TIME_TABLE_TAB:
                    this.todoListElem.style.display = 'none';
                    this.weeklyView.style.display = 'none';
                    this.tableTab.style.display = 'block';
                    this.buttonContainer.style.display = 'none';
                    break;
                default:
                    break;
            }

            this.todoList.onTabChanged(tabType);
            const tablinks = document.getElementsByClassName('nav-item');

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
