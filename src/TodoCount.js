export class TodoCount {
    constructor() {
        this.totalCount = document.getElementById('total-count');
        this.unCompleteCount = document.getElementById('uncomplete-count');
    }

    render(totalCount, unCompleteCount) {
        if (typeof totalCount === 'number' && typeof unCompleteCount === 'number') {
            this.totalCount.innerHTML = totalCount;
            this.unCompleteCount.innerHTML = unCompleteCount;
        }
    }
}
