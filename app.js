let currentSubject = 0;

const jumbotron = document.querySelector(".jumbotron");
const startButton = document.getElementById("start-button");
const titleHeader = document.getElementById("title");
const statementPara = document.getElementById("statement");
const opinie = document.getElementById("opinie");
const optionButtons = document.querySelectorAll(".option");
const selResult = document.getElementById("parties");
const endResult = document.getElementById("results");
const Field = document.getElementById("parties");
const back = document.getElementById("button-back");
const stateSel = document.getElementById("statementSelect");
const nextParty = document.getElementById("button-next");
var userInput = [];
var partyChoice = [];
var partySelection = [];
var stateSelect = [];
var statementId = 0;
var select;

startButton.onclick = start;

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

    for (i = 0; i < parties.length; i++) {
        partyChoice.push({
            party: parties[i].name,
            opinions: fetchPartyOpinion(parties[i].name),
            score: 0
        });
    }
}

function fetchPartyOpinion(party) {
    var opinionArray = [];

    subjects.forEach(subject => {
        subject.parties.forEach(partyInSubject => {
            if (partyInSubject.name == party) {
                opinionArray.push(partyInSubject.position);
            }
        });
    });
    return opinionArray
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
        statementPara.hidden = true;
        stateSel.hidden = false;
        return keepSubjects(stateSel);
    }

    titleHeader.innerText = subjects[currentSubject].title;
    opinie.innerText = subjects[currentSubject].statement;

}



function keepSubjects(givenField) {
    /*
    selecteer stellingen die je belangrijk vindt en mee wilt nemen naar eind uitslag
    */
    var checkboxes = "statementCheckbox";
    var classLabel = "statementLabel";

    subjects.forEach((subject, index) => {
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.setAttribute("name", subject.title);
        newCheckbox.value = index;
        console.log(subject);

        newCheckbox.classList.add('mr-2', 'ml-1', `${checkboxes}`);
        var newLabel = document.createElement("label");
        if (subject.title != null) {
            newLabel.innerHTML = subject.title;
        }

        if (subject.name != null) {
            newLabel.innerHTML = subject.name;
        }

        newLabel.setAttribute("class", classLabel);

        var newLine = document.createElement("br");

        givenField.append(newLabel);
        givenField.append(newCheckbox);
        givenField.append(newLine);

        newCheckbox = null;
    });
    nextParty.addEventListener("click", function () {
        stateSel.hidden = true;
        selResult.hidden = false;
        generatePartyList(parties, Field);
    });
}

function generatePartyList(givenArray, givenField) {
    /*
    display partij namen
    "next" knop die geselecteerde partijen mee neemt
    naar eind resultaat.
    */
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
        newCheckbox.onclick = function (e) {
            document.getElementById("party-continue").disabled = false;
        }

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
                document.getElementById("party-continue").disabled = false;
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
                document.getElementById("party-continue").disabled = false;
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
        btnEnd.disabled = true;
        btnEnd.id = "party-continue";
        btnEnd.setAttribute("class", "btn btn-primary");
        btnEnd.innerHTML = "naar eind-resultaat";
        btnEnd.addEventListener("click", function () {
            selResult.hidden = true;
            endResult.hidden = false;
            calculateResults();
            /* sortResults(); */
            displayResults();
        });

        givenField.append(btnSize);
        givenField.append(btnSecular);
        givenField.append(btnEnd);
    }
}

function calculateResults() {
    /*
    toon  partij/partijen die het meest overeenkomt(komen) met jouw opinie(s)
    */

    for (var a = 0; a < partyChoice.length; a++) {
        if (partyChoice[a] != null) {
            for (var b = 0; b < userInput.length; b++) {
                if (userInput[b] == partyChoice[a].opinions[b]) {
                    partyChoice[a].score++;
                    if (stateSelect[b] == true) {
                        partyChoice[a].score++;
                    }
                }
            }
        }
    }



    return
}

function displayResults() {
    partyChoice.sort(function (x, y) {
        return y.score - x.score;
    });

    for (var i = 0; i < 3; i++) {
        var para = document.createElement("P");
        para.innerHTML = (i + 1) + ". " + partyChoice[i].party;
        document.getElementsByClassName("card")[0].appendChild(para);
    }
}