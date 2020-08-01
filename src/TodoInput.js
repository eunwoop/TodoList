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

        const yoilChecks = document.getElementById('date-checks');
        const dateChecks = document.getElementById('calendar');

    
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
            if (dateChecks.style.visibility === 'visible') {
                dateChecks.style.visibility = 'collapse';
            } else {
                dateChecks.style.visibility = 'visible';
                if (yoilChecks.style.visibility === 'visible') {
                    yoilChecks.style.visibility = 'collapse';
                }
            }
        }
        yoilButton.onclick = () => {
            if (yoilChecks.style.visibility === 'visible') {
                yoilChecks.style.visibility = 'collapse';
            } else {
                yoilChecks.style.visibility = 'visible';
                if (dateChecks.style.visibility === 'visible') {
                    dateChecks.style.visibility = 'collapse';
                }
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
                this.onEnter(this.todoInput.value);
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

    onEnter(value) {
        if (this.validateInput(value)) {
            if (this.onEnterListener) {
                this.onEnterListener(value);
            } else {
                console.error("onEnterListener is undefined");
            }
        }
    }
}
