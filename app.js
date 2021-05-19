let currentSubject = 0;

const jumbotron = document.querySelector(".jumbotron");
const startButton = document.getElementById("startBtn");
const titleHeader = document.getElementById("title");
const statementPara = document.getElementById("statement");
const opinie = document.getElementById("opinie");
const optionButtons = document.querySelectorAll(".option");
const selResult = document.getElementById("parties");
const endResult = document.getElementById("results");
const Field = document.getElementById("parties");
const back = document.getElementById("button-back");
const stateSel = document.getElementById("statementSelect");
var userInput = [];
var partySelection = [];
var stateSelect = [];
var statementId = 0;
var select;

/* geen uitleg nodig, dit start de stemwijzer */

function start() {
    jumbotron.hidden = true;
    statementPara.hidden = false;
    titleHeader.innerText = subjects[0].title;
    opinie.innerText = subjects[0].statement;
    optionButtons.forEach(element => {
        element.addEventListener("click", function () {
            keepProgress(element.value);
        })
    });
}

/* 
Elke keer als er op een bepaalde keuze knop wordt geklikt,
sla de waarde van die knop op
en ga naar volgende statement
*/

back.onclick = function () {
    choice = "terug";
}

function keepProgress(choice) {
    /*
    choice opslaan in userInput array
    en doorgaan naar volgende stmt
    display actuele stmt ID
    "terug" knop om naar de vorige stelling te gaan
     */
    console.log(choice);
    if (choice != "terug") {
        userInput[currentSubject] = choice;
        currentSubject++;
    } else {
        currentSubject--;
    }
    console.log(userInput);
    if (currentSubject == 1) {
        back.hidden = false;
    }

    if (currentSubject >= subjects.length) {
        return keepSubjects(Field);
    }

    titleHeader.innerText = subjects[currentSubject].title;
    opinie.innerText = subjects[currentSubject].statement;

}

function keepSubjects(givenField) {
    /*
    selecteer stellingen die je belangrijk vindt en mee wilt nemen naar eind uitslag
    */
    statementPara.hidden = true;
    stateSel.hidden = false;

    var checkboxes = "statementCheckbox";
    var classLabel = "statementLabel";

    var loopCount = 0;
    subjects.forEach(object => {
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.setAttribute("name", subjects[loopCount].name);
        newCheckbox.value = loopCount;
        console.log(object);

        newCheckbox.classList.add('mr-2', 'ml-1', `${checkboxes}`);
        var newLabel = document.createElement("label");
        if (object.title != null) {
            newLabel.innerHTML = object.title;
        }

        if (object.name != null) {
            newLabel.innerHTML = object.name;
        }

        newLabel.setAttribute("class", classLabel);

        var newLine = document.createElement("br");

        givenField.append(newLabel);
        givenField.append(newCheckbox);
        givenField.append(newLine);

        newCheckbox = null;
        loopCount++;
    });
}

function generateCheckboxList(givenArray, givenField) {
    /*
    display partij namen
    "next" knop die geselecteerde partijen mee neemt
    naar eind resultaat.
    */
    stateSel.hidden = true;
    selResult.hidden = false;

    var checkboxes = "";
    var classLabel = "";

    if (givenArray == parties) {
        checkboxes = "partyCheckbox";
        classLabel = "partyLabel";
    }

    var loopCount = 0;
    givenArray.forEach(object => {
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.setAttribute("name", parties[loopCount].name);
        newCheckbox.value = loopCount;

        newCheckbox.classList.add('mr-2', 'ml-1', `${checkboxes}`);
        var newLabel = document.createElement("label");
        if (object.title != null) {
            newLabel.innerHTML = object.title;
        }

        if (object.name != null) {
            newLabel.innerHTML = object.name;
        }

        newLabel.setAttribute("class", classLabel);

        var newLine = document.createElement("br");

        givenField.append(newLabel);
        givenField.append(newCheckbox);
        givenField.append(newLine);

        newCheckbox = null;
        loopCount++;
    });

    if (givenArray == parties) {
        var btnSecular = document.createElement("button");
        var partyCheckboxes = document.querySelectorAll(".partyCheckbox");

        btnSecular.setAttribute("class", "btn btn-primary");
        btnSecular.innerHTML = "Seculiere partijen";
        btnSecular.addEventListener("click", function () {
            partyCheckboxes.forEach(element => {
                element.checked = false;
                var name = element.getAttribute("name");
                parties.forEach(party => {
                    if (party.secular == true) {
                        if (party.name == name) {
                            element.checked = true;
                            partySelection.push(name);
                        }
                    }
                });
            })
        });

        var btnSize = document.createElement("button");
        var partyCheckboxes = document.querySelectorAll(".partyCheckbox");
        btnSize.setAttribute("class", "btn btn-primary");
        btnSize.innerHTML = "Selecteer alle grote partijen";
        btnSize.addEventListener("click", function () {
            partyCheckboxes.forEach(element => {
                var name = element.getAttribute("name");
                element.checked = false;
                parties.forEach(party => {
                    if (party.size > 0) {
                        if (party.name == name) {
                            element.checked = true;
                            partySelection.push(name);
                        }
                    }
                });
            });
        });

        var btnEnd = document.createElement("button");
        btnEnd.setAttribute("class", "btn btn-primary");
        btnEnd.innerHTML = "naar eind-resultaat";
        btnEnd.addEventListener("click", function () {
            calculateResults();
        });

        givenField.append(btnSize);
        givenField.append(btnSecular);
        givenField.append(btnEnd);
    }
}

function calculateResults() {
    /*
    toon  partij/partijen die het meest overeenkomt(komen) met jouw opinie
    */
    selResult.hidden = true;
    endResult.hidden = false;

    return
}