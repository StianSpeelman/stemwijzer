let currentSubject = 0;

const startButton = document.getElementById("startBtn");
const titleHeader = document.getElementById("title");
const statementPara = document.getElementById("statement");

startButton.onclick = clickStartBtn;

function show(element) {
    element.classList.remove("hidden");
}

function hide(element) {
    element.classList.add("hidden");
}