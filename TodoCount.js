class TodoCount {
    constructor() {
        this.totalCount = document.getElementById('total-count');
        this.completeCount = document.getElementById('complete-count');
    }

    render(totalCount, completeCount) {
        if (typeof totalCount === 'number' && typeof completeCount === 'number') {
            this.totalCount.innerHTML = totalCount;
            this.completeCount.innerHTML = completeCount;
        }
    }
}
