import {sendToServer, updateData, deleteFromServer} from './Api';
import {isArray, removeDataFromArray} from './Utils';
import {getDateString, isTomorrow, isToday, getThisWeekDates} from './Date';
import {TAB_TYPE} from './Tab';
import { WEEK_STRING, WEEK_STRING_KOR } from './Weekly';

export class TodoList {
    constructor(listElement, weekUlElements, user) {
        this.ListElement = listElement;
        this.weekUlElements = weekUlElements;
        this.editMode = false;
        this.user = user;
        this.currentTab = TAB_TYPE.WEEKLY_TAB;
        this.diffFromCurrentWeek = 0; // 0 : current 1: +1 week -1: -1 week.

        this.setMoveWeekOnClick();
        this.getWeekDivDomArray();
    }

    setMoveWeekOnClick() {
        document.getElementById('prev-week-button').onclick = () => {
            this.diffFromCurrentWeek--;
            console.log('diff: ' + this.diffFromCurrentWeek);
            this.render();
        }
        document.getElementById('next-week-button').onclick = () => {
            this.diffFromCurrentWeek++;
            console.log('diff: ' + this.diffFromCurrentWeek);
            this.render();
        }
        document.getElementById('this-week-button').onclick = () => {
            this.diffFromCurrentWeek = 0;
            console.log('diff: ' + this.diffFromCurrentWeek);
            this.render();
        }
    }

    getTotalListLength() {
        if (this.dataList == null || !isArray(this.dataList)) {
            return 0;
        }
        return this.dataList.length;
    }

    getTodayListLength() {
        const todayList = this.dataList.filter(
            element => isToday(element.dueDate));

        return todayList.length;
    }

    getUnCompleteNum() {
        if (this.dataList == null || !isArray(this.dataList)) {
            return 0;
        }
        const todayUnCompleteDataList = this.dataList.filter(
            element => isToday(element.dueDate) && element.isCompleted === false);
        
        return todayUnCompleteDataList.length;;
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

        let currentTabDataList;
        this.drawWeeklyTab();
    }

    drawList(currentTabDataList, listElement) {
        currentTabDataList.forEach((data) => {
            const todoItem = this.createItemElem(data);
            todoItem.innerHTML = data.isCompleted ?
                `<s>${data.text}</s>` : `${data.text}`;
            todoItem.id = data.id;
            if (data.dueDate !== undefined && data.dueDate !== '' &&
                this.currentTab === TAB_TYPE.ALL_TAB) {
                todoItem.appendChild(this.createDueDate(data.dueDate));
            }
            if (this.editMode) {
                todoItem.appendChild(this.createDeleteButton(data));
            }
            // not weekly tab.
            if (listElement === undefined) {
                this.ListElement.append(todoItem);
            } else {
                console.log("append" + todoItem);
                listElement.append(todoItem);
            }
        });
    }

    getWeekDivDomArray() {
        const idPrefix = 'day-in-weekly-';
        this.weekDivElements = [];
        WEEK_STRING.forEach(element => {
            this.weekDivElements.push(document.getElementById(idPrefix + element));
        });
    }

    drawWeeklyTab() {
        console.log("drawWeeklyTab!");
        let weekDates = getThisWeekDates(this.diffFromCurrentWeek);

        // draw header "10-24 월"
        for (let i = 0; i < 7; i++) {
            const dateText = weekDates[i].substring(5);
            this.weekDivElements[i].innerHTML = dateText + '   ' + WEEK_STRING_KOR[i];
        }

        // draw todo list of the day
        let weekTabDataLists = [];
        for (let i = 0; i < 7; i++) {
            weekTabDataLists[i] = [];
            this.dataList.forEach((e)=>{
                if (getDateString(e.dueDate) === weekDates[i]) {
                    weekTabDataLists[i].push(e);
                }
            })
            this.weekUlElements[i].innerHTML = '';
            this.drawList(weekTabDataLists[i], this.weekUlElements[i]);
        }
    }

    createDeleteButton(data) {
        const deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.class = "btn btn-xs";
        deleteButton.innerHTML = '<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>';
    
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
        
        dueDate.style.backgroundColor = "#ffffff";
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
