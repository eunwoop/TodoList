export function initTables() {
    console.log("initTables");
    // contenteditable 속성을 가진경우
    const contents = document.getElementsByClassName("rowColumn");

    console.log(contents);

    // rowColumn 클래스의 갯수 만큼 반복문을 실행한다.
    Array.from(contents).forEach((content) => {

        console.log('add click: ' + content);
        content.dataset.default = content.textContent;

        // 마우스로 해당영역을 더블클릭 한경우
        content.addEventListener('click', (event) => {
            console.log('click: ' + content);
            if (content.isContentEditable === false) {
                content.contentEditable = true;
                content.style.border = "1px solid #FFB6C1";
                content.focus();
            }
        });

        //키보드 입력이 방생한 경우 실행
        content.addEventListener("keypress", (event) => {
            // @breif Enter키 입력시 실행
            if (event.key === "Enter") {
                console.log('Enter: ' + content);
                // 내용의 수정이 완료되었다면 data 태그의 기본값도 바꿔준다.
                content.dataset.default = content.textContent;
                content.contentEditable = false;
                content.style.border = "0px";
            }
        });
    });
}