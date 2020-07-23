const ENTER_KEY = 13;
export class TodoInput {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.enterButton = document.getElementById('enter-button');
        this.addEnterListener();
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
        if (this.enterButton !=  null) {
            this.enterButton.onclick = () => {
                if (this.validateInput(this.todoInput.value)) {
                    this.onEnterListener(this.todoInput.value);
                }
            };
        }
        if (this.todoInput != null) {
            this.todoInput.addEventListener('keydown', (event) => {
                if (event.keyCode === ENTER_KEY) {
                    if (this.validateInput(this.todoInput.value)) {
                        this.onEnterListener(this.todoInput.value);
                    }
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
}
