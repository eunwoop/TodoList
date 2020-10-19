import { getTomorrow, getCurrentDate } from "./Date";

const ENTER_KEY = 13;
export class TodoInput {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.enterButton = document.getElementById('enter-button');

        const modal = document.getElementById("input-window");
        const addBtn = document.getElementById("add-todo-button");
        const weeklyDay = document.querySelectorAll('.day-in-weekly');
        const span = document.getElementsByClassName("close")[0];
        
        this.dateCheck = document.getElementById('date-check');
        this.calendar = document.getElementById('calendar');
        this.todayButton = document.getElementById('today-button');
        this.tomorButton = document.getElementById('tomor-button');
    
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        this.addEnterListener();

        this.todayButton.onclick = (e) => {
            this.tomorButton.className = this.tomorButton.className.replace(' active', '');
            if (!e.currentTarget.className.includes('active')) {
                e.currentTarget.className += ' active';
            }
        }
        this.tomorButton.onclick = (e) => {
            this.todayButton.className = this.todayButton.className.replace(' active', '');
            if (!e.currentTarget.className.includes('active')) {
                e.currentTarget.className += ' active';
            }
        }
        this.calendar.onclick = (e) => {
            this.todayButton.className = this.todayButton.className.replace(' active', '');
            this.tomorButton.className = this.tomorButton.className.replace(' active', '');
            if (!e.currentTarget.className.includes('active')) {
                e.currentTarget.className += ' active';
            }
        }
     }

    validateInput(value) {
        if (value === '') {
            alert('할일을 입력해주세요.');
            return false;
        }
        if (value.length > 100) {
            alert('100자 미만으로 입력해주세요. 지금길이: ' + value.length);
            return false;
        }
        return true;
    }

    addEnterListener() {
        if (this.enterButton != null) {
            this.enterButton.onclick = () => {
                let date;
                if (this.todayButton.className.includes('active')) {
                    date = getCurrentDate();
                } else if (this.tomorButton.className.includes('active')) {
                    date = getTomorrow();
                } else {
                    date = this.calendar.value;
                }
                this.onEnter(this.todoInput.value, date);
            };
        }
        if (this.todoInput != null) {
            this.todoInput.addEventListener('keydown', (event) => {
                if (event.keyCode === ENTER_KEY) {
                    this.onEnter(this.todoInput.value);
                }
            });
        }
    }

    setOnNewDataListener(listener) {
        console.log('set on new data listener');
        this.onEnterListener = listener;
    }

    render() {
        this.todoInput.value = '';
    }

    onEnter(value, date) {
        if (this.validateInput(value)) {
            if (this.onEnterListener) {
                this.onEnterListener(value, date);
            } else {
                console.error("onEnterListener is undefined");
            }
        }
    }
}
