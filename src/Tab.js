export const TAB_TYPE = {
    ALL_TAB: 0,
    TODAY_TAB: 1,
    TOMOR_TAB: 2,
    WEEKLY_TAB: 3,
}

export class Tab {
    constructor() {
        document.querySelector('#all-tab').onclick = (e) => { this.onTabClicked(e, TAB_TYPE.ALL_TAB) };
        document.querySelector('#today-tab').onclick = (e) => { this.onTabClicked(e, TAB_TYPE.TODAY_TAB) };
        document.querySelector('#tomor-tab').onclick = (e) => { this.onTabClicked(e, TAB_TYPE.TOMOR_TAB) };
        document.querySelector('#weekly-tab').onclick = (e) => { this.onTabClicked(e, TAB_TYPE.WEEKLY_TAB) };
    }

    setOnTabClickListener(listener) {
        this.onTabClicked = listener;
    }
}