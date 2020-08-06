const ENTER_KEY = 13;
export class TodoInput {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.enterButton = document.getElementById('enter-button');

        const modal = document.getElementById("input-window");
        const btn = document.getElementById("myBtn");
        const span = document.getElementsByClassName("close")[0];

        const dateButton = document.getElementById('date-button');
        const yoilButton = document.getElementById('yoil-button');

        this.yoilCheck = document.getElementById('yoil-check');
        this.dateCheck = document.getElementById('date-check');
        this.calendar = document.getElementById('calendar');
        this.todayButton = document.getElementById('today-button');
        this.tomorButton = document.getElementById('tomor-button');
    
        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        this.addEnterListener();

        dateButton.onclick = () => {
            if (this.dateCheck.style.visibility === 'visible') {
                this.dateCheck.style.visibility = 'collapse';
            } else {
                this.dateCheck.style.visibility = 'visible';
                if (this.yoilCheck.style.visibility === 'visible') {
                    this.yoilCheck.style.visibility = 'collapse';
                }
            }
        }
        yoilButton.onclick = () => {
            if (this.yoilCheck.style.visibility === 'visible') {
                this.yoilCheck.style.visibility = 'collapse';
            } else {
                this.yoilCheck.style.visibility = 'visible';
                if (this.dateCheck.style.visibility === 'visible') {
                    this.dateCheck.style.visibility = 'collapse';
                }
            }
        }

        this.todayButton.onclick = (e) => {
            this.tomorButton.className = this.tomorButton.className.replace(' active', '');
            if (!e.currentTarget.className.includes('active')) {
                e.currentTarget.className += ' active';
            }
            console.log("today ");
        }
        this.tomorButton.onclick = (e) => {
            this.todayButton.className = this.todayButton.className.replace(' active', '');
            if (!e.currentTarget.className.includes('active')) {
                e.currentTarget.className += ' active';
            }
            console.log("tomorrow ");
        }
        this.calendar.onclick = (e) => {
            this.todayButton.className = this.todayButton.className.replace(' active', '');
            this.tomorButton.className = this.tomorButton.className.replace(' active', '');
            if (!e.currentTarget.className.includes('active')) {
                e.currentTarget.className += ' active';
            }
            console.log("other ");
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
                    date = Date.now();
                    console.log("today " + date);
                } else if (this.tomorButton.className.includes('active')) {
                    const today = new Date();
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    date = tomorrow;
                    console.log('tomorrow' + date);
                } else {
                    console.log("date " + this.calendar.value);
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
