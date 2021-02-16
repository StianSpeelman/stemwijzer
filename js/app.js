let StartButton = document.getElementById("start-button");
let jumbotron = document.getElementById("start-jumbotron");
let questions = document.getElementById("questions");
let question = 0;

StartButton.onclick = function () {
    jumbotron.hidden = true;
    questions.hidden = true;
}