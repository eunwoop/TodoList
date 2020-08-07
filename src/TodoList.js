import {sendToServer, updateData, deleteFromServer} from './Api';
import {isArray, removeDataFromArray} from './Utils';
import {getDateString, isTomorrow, isToday} from './Date';
import {TAB_TYPE} from './Tab';

export class TodoList {
    constructor(element, user) {
        this.ListElement = element;
        this.editMode = false;
        this.user = user;
        this.currentTab = TAB_TYPE.ALL_TAB;
    }

    getListLength() {
        if (this.dataList == null) {
            return 0;
        }
        return this.dataList.length;
    }

    getCompleteNum() {
        if (this.dataList == null || !isArray(this.dataList)) {
            return 0;
        }
        let completeNum = 0;
        this.dataList.forEach(element => {
            if (element.isCompleted === false) {
                completeNum++;
            }
        });
        return completeNum;
    }

    inputValidator(data) {
        if (data == null) {
            throw new Error('data is null or undefined');
        }
        if (data.text === undefined) {
            throw new Error('data has no text field.');
        }
        if (data.isCompleted === undefined) {
            throw new Error('data has no isCompleted field.');
        }
        if (typeof data.isCompleted !== 'boolean') {
            throw new Error('isCompleted field type is not boolean.');
        }
    }

    render() {
        if (this.ListElement == null) {
            throw new Error('element is null');
        }
        this.ListElement.innerHTML = '';
        if (this.dataList == null || this.dataList.length === 0) {
            return;
        }

        switch(this.currentTab) {
            case TAB_TYPE.ALL_TAB:
                this.currentTabDataList = this.dataList;
                break;
            case TAB_TYPE.TODAY_TAB:
                this.currentTabDataList = this.dataList.filter(
                    element => isToday(element.dueDate));
                break;
            case TAB_TYPE.TOMOR_TAB:
                this.currentTabDataList = this.dataList.filter(
                    element => isTomorrow(element.dueDate));
                break;
            default:
                break;
        }

        this.currentTabDataList.forEach((data) => {
            const todoItem = this.createItemElem(data);
            todoItem.innerHTML = data.isCompleted ?
                `<s>${data.text}</s>` : `${data.text}`;
            todoItem.id = data.id;
            if (data.dueDate !== undefined && data.dueDate !== '') {
                todoItem.appendChild(this.createDueDate(data.dueDate));
            }
            if (this.editMode) {
                todoItem.appendChild(this.createDeleteButton(data));
            }
            this.ListElement.append(todoItem);
        });
    }

    createDeleteButton(data) {
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '삭제';
        deleteButton.onclick = (event) => {
            console.log(deleteButton.parentElement);
            this.dataList = removeDataFromArray(this.dataList, data);
            deleteFromServer(data);
            event.stopPropaxgation();
            this.render();
        }
        return deleteButton;
    }

    //TODO: declare in CSS class.
    createDueDate(date) {
        const dueDate = document.createElement('span');
        let dateStr = getDateString(date);
        if (isToday(dateStr)){
            dateStr = '오늘';
            dueDate.style.color = "#ffffff";
            dueDate.style.backgroundColor = "#900d09";
        } else if (isTomorrow(dateStr)) {
            dateStr = '내일';
            dueDate.style.backgroundColor = "#7ebc59";
        } else {
            dueDate.style.backgroundColor = "#ffffff";
        }

        dueDate.innerHTML = dateStr;
        dueDate.style.fontSize = "10px";
        dueDate.style.fontWeight = "100";
        dueDate.style.borderRadius = "10px";
        dueDate.style.marginLeft = "10px";
        dueDate.style.padding = "3px";

        return dueDate;
    }

    createItemElem(data) {
        const itemElem = document.createElement('li');
        itemElem.onclick = () => {
            this.toggleComplete(data);
            this.onDataChanged();
        }
        return itemElem;
    }

    toggleComplete(data) {
        if (data != null) {
            data.isCompleted = !data.isCompleted;
            updateData(data);
        }
        return data;
    }

    setState(newDataList) {
        try {
            if (!isArray(newDataList)) {
                console.error('newDataList is not an array');
                console.error('typeof newDataList : ' + typeof newDataList);
                console.error(newDataList);
                return;
            }
            newDataList.forEach(data => {
                this.inputValidator(data);
            })
            console.log("setSTATE");
            console.log(newDataList);
            this.dataList = newDataList;
            this.onDataChanged();
        } catch (error) {
            console.error(error);
        }
    }

    async addData(nextData) {
        try {
            this.inputValidator(nextData);
            if (this.dataList == null) {
                this.dataList = [];
            }
            
            const id = await sendToServer(nextData);
            nextData.id = id;
            this.dataList.push(nextData);
            this.onDataChanged();
        } catch (error) {
            console.error(error);
        }
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
        this.render();
    }

    setOnDataChangedCallback(callback) {
        this.onDataChanged = callback;
    }

    onTabChanged(tabType) {
        this.currentTab = tabType;
        this.render();
    }
}
