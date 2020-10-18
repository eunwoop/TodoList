export const TAB_TYPE = {
    WEEKLY_TAB: 3,
    TIME_TABLE_TAB: 4,
}

export class Tab {
    constructor() {
        document.querySelector('#weekly-tab').onclick = (e) => { this.onTabClicked(e, TAB_TYPE.WEEKLY_TAB) };
        document.querySelector('#time-table-tab').onclick = (e) => {
            this.onTabClicked(e, TAB_TYPE.TIME_TABLE_TAB)
        }
    }

    setOnTabClickListener(listener) {
        this.onTabClicked = listener;
    }
}