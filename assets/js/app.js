startButton.onclick = questions;
back.onclick = index;

var currentSubject = 0
var answers = []
var partyNames = []
var partyScore = []
var currentParty = []

for (let index = 0; index < parties.length; index++){
	currentParty[index] = {
		name: ""
	}
}

for (let index = 0; index < parties.length; index++){
	partyNames.push (parties[index].name)
}

for (let index = 0; index < parties.length; index++){
	partyScore[index] = {
		name: parties[index].name,
		score: 0
	}
}

index()

function index(){
	document.getElementById('questiongText').style.display ='none'
	document.getElementById('buttons').style.display ='none'
	document.getElementById('checkboxList').style.display ='none'
	document.getElementById('back').style.display ='none'
	document.getElementById('importantSubjects').style.display ='none'

	document.getElementById('startButton').style.display ='inline-block'
	document.getElementById('Header').style.display ='inline-block'
	document.getElementById('info').style.display ='inline-block'

	document.getElementById("blueText").innerHTML = 'Vergelijk hier uw standpunten met die van andere partijen aan de hand van 30 vragen'

}

function questions(){
	if (currentSubject == subjects.length ){
		console.log('questionsResult')

		document.getElementById('contra').style.display = 'none';
		document.getElementById('none').style.display = 'none';
		document.getElementById('skip').style.display = 'none';

		document.getElementById('importantSubjects').style.display ='inline-block'

		document.getElementById('checkboxList').style.display ='inline-block'

		document.getElementById("pro").innerHTML ='ga verder'

		document.getElementById("blueText").innerHTML ='Zijn er onderwerpen die u extra belangrijk vindt?'
		document.getElementById("questiongText").innerHTML ='Aangevinkte stellingen tellen extra mee bij het berekenen van het resulaat.'

		pro.onclick = takePoliticalparty;
		
            // toont checkboxes met stelling

  			 for(var checkboxNumber = 0; checkboxNumber < subjects.length; checkboxNumber++) {
				var div = document.createElement('div');
				checkboxList.appendChild(div);

				div.className = 'checkboxDiv' 
				var checkbox = document.createElement("input");                
       			checkbox.className = "w3-check";
				checkbox.id = 'checkbox' + checkboxNumber;
				checkbox.type = 'checkbox';
				checkbox.setAttribute("onclick", "checkboxCheck("+checkboxNumber+")")
       			div.appendChild(checkbox);

				var checkboxText = document.createElement("p");                
				checkboxText.id = "checkboxText" + checkboxNumber;
       			div.appendChild(checkboxText);

				document.getElementById("checkboxText" + checkboxNumber).innerHTML = subjects[checkboxNumber].title
			}

	}
			else{
				document.getElementById("blueText").innerHTML = subjects[currentSubject].title
				document.getElementById("questiongText").innerHTML = subjects[currentSubject].statement


				document.getElementById('startButton').style.display ='none'
				document.getElementById('Header').style.display ='none'
				document.getElementById('info').style.display ='none'


				document.getElementById('questiongText').style.display ='inline-block'
				document.getElementById('buttons').style.display ='inline-block'
				document.getElementById('back').style.display ='inline-block'

				pro.onclick = nextAgree;
				contra.onclick = nextDisagree;
				back.onclick = backQuestion;
				skip.onclick = noAnswer;
				none.onclick = noAnswer;
				}
	}

	function checkboxCheck(checkboxNumber){
		var checkbox = document.getElementById('checkbox' + checkboxNumber);
		var checkboxText = document.getElementById('checkboxText' + checkboxNumber).innerText;
		
  		if (checkbox.checked == true){
			  console.log('checkboxTrue')

			  // checks if text == data.js // 
			  for(c = 0; c < subjects.length; c++) {
				var currentSubject = subjects[c];
				var myAnswer = answers[c]

			  	if( checkboxText == currentSubject.title){
					// checks all pro in data.js //
					for(d = 0; d < currentSubject.parties.length; d++) {
						this.currentParty[d].name = currentSubject.parties[d]			
						
						// checks if partyName == partyScore //
						for(e = 0; e < this.partyScore.length; e++){
							// this.partyScore[0].score++;
								if(this.currentParty[e].name == this.partyScore[e].name){
									if(currentParty.position == myAnswer){
										console.log('extra points to ' + partyScore.name )
										partyScore.score++;
									}
								}	
						}
					}
				}
			  }
		}

		if (checkbox.checked == false){
			console.log('checkboxFalse')

				  // checks if text == data.js // 
				  for(c = 0; c < subjects.length; c++) {
					var currentSubject = subjects[c];
					var myAnswer = answers[c]
	
					  if( checkboxText == currentSubject.title){
						// checks all pro in data.js //
						for(d = 0; d < currentSubject.parties.length; d++) {
							var currentParty = currentSubject.parties[d];			
							
							// checks if partyName == partyScore //
							for(e = 0; e < partyScore.length; e++){
								var partyScore = partyScore[e];
								
									if(currentParty.name == partyScore.name){
										if(currentParty.position == myAnswer){
											console.log('remove extra points from ' + partyScore.name )
											partyScore.score--
										}
									}	
							}
						}
					}
				  }
		}
	}

function nextAgree(){
	console.log('questionsTrue');

    answers[currentSubject] = 'pro';

	currentSubject++;

    questions();
}

function nextDisagree(){
	console.log('questionsDisagree');

    answers[currentSubject] = 'contra';

	currentSubject++;

	questions();
}

function backQuestion(){
	console.log('backQuestion');

	currentSubject--;

	questions();
}

function noAnswer(){
	console.log('noAnswer');

	answers[currentSubject] = 'none';

    currentSubject++;

	questions();
}

function takePoliticalparty(){ 
	for(b = 0; b < answers.length; b++){
		for(a= 0;a<subjects[b].parties.length;a++){
			var partyPosition = subjects[b].parties[a].position;
			var partyName = subjects[b].parties[a].name;

			// checks if answers == party position //
			if(answers[b] == partyPosition){
				console.log("je bent het eens met " + partyName + ", jullie hadden beide " + partyPosition);
				var foundIndex = partyScore.findIndex((partyScoreObject) => partyScoreObject.name == partyName);
				
				
				partyScore[foundIndex].score++;

					// checks if partyName == partyscore // 
					// for(c = 0; c < partyScore.length; c++){
					// 	if(partyName === partyScore[c].name){
					// 		Checker = document.getElementById("checkbox" + c);
					// 		if(currentParty[a].position == answers[a].position && Checker.checked == true){
					// 			partyScore[a].score++;
					// 		}
					// 	}
					// }
			}
			else{
				console.log("je bent het niet eens met " + partyName);
			}
		  }
		}
	  
	console.log(partyScore)
	answerDisplay()
}

// display answers here

function answerDisplay() {
	document.getElementById('questiongText').style.display ='none'
	document.getElementById('buttons').style.display ='none'
	document.getElementById('back').style.display ='none'

	document.getElementById('checkboxList').style.display ='none'
	document.getElementById("blueText").innerHTML = 'Resultaten'

	partyScore.sort(function (x, y) {
		return y.score - x.score;
	});

	for(var index = 0; index < partyScore.length; index++){
		document.getElementById("namePrint").innerHTML += partyScore[index]['name'] + ' ' + partyScore[index]['score'] + '<br>' ;
}
}