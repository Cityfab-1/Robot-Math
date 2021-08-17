// ++++++++++++++++++++++++++++++ SPEECH ++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var numbers = [ '1' , '2' , '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '45', '46', '47', '48'];
var grammar = '#JSGF V1.0; grammar numbers; public <color> = ' + numbers.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
// recognition.continuous = false;
recognition.lang = 'en-US';
// recognition.lang = 'fr-FR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
numbers.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Click on the Robot or Submit then say a number. In English for now because easier to get online help if needed.';

function recognitionStart() {
  recognition.start();
  console.log('Ready to receive a number.');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var valueXstudent = event.results[0][0].transcript;
  diagnostic.textContent = valueXstudent;
  bg.style.backgroundColor = valueXstudent;
  console.log('Confidence: ' + event.results[0][0].confidence);
  
  // ++++++++++++++++++++++++++++++ Math ++++++++++++++++++++++++++++++++++ //
  document.getElementById("IDvalueXstudentBig").innerHTML = valueXstudent;
  var operatorZteacher1 = document.getElementById('IDoperatorZteacher1').value;
  var operatorZteacher2 = document.getElementById('IDoperatorZteacher2').value;
  var valueZteacher1 = parseFloat(validate(document.getElementById("IDvalueZteacher1").value.trim()));
  var valueZteacher2 = parseFloat(validate(document.getElementById("IDvalueZteacher2").value.trim()));
  var resultYrobot1 = operate(valueXstudent, valueZteacher1, operatorZteacher1);
  var resultYrobot2 = operate(resultYrobot1, valueZteacher2, operatorZteacher2);
  //// var resultYrobotRound = parseFloat(resultYrobot2).toFixed(2);
  var resultYrobotRound = parseFloat(Math.round((resultYrobot2 + Number.EPSILON) * 100.0) / 100.0);
  document.getElementById("IDresultYrobotBig").innerHTML = resultYrobotRound;
  // document.getElementById("resultYrobotBig").innerHTML = resultYrobot.toFixed(2);
  // document.getElementById("text-input").innerHTML = resultYrobot.toFixed(2);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that number.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

// ++++++++++++++++++++++++++++++ Math ++++++++++++++++++++++++++++++++++ //
// + before value is a way to convert a string to a number https://stackoverflow.com/questions/8377410/addition-is-not-working-in-javascript //
function operate(valueXstudent, valueZteacher1, operatorZteacher1) {
  if (operatorZteacher1 == 'choose1') {
    alert("You must choose a first operator!");
  } else if (operatorZteacher1 == 'addition1') {
    return +valueXstudent + +valueZteacher1;
  } else if (operatorZteacher1 == 'subtraction1') {
    return +valueXstudent - +valueZteacher1;
  } else if (operatorZteacher1 == 'division1') {
    return +valueXstudent / +valueZteacher1;
  } else if (operatorZteacher1 == 'multiplication1') {
    return +valueXstudent * +valueZteacher1;
  }
}
function operate(resultYrobot1, valueZteacher2, operatorZteacher2) {
  if (operatorZteacher2 == 'choose2') {
    alert("You must choose a second operator!");
  } else if (operatorZteacher2 == 'addition2') {
    return +resultYrobot1 + +valueZteacher2;
  } else if (operatorZteacher2 == 'subtraction2') {
    return +resultYrobot1 - +valueZteacher2;
  }
}

function validate(value) {
  if (value == null || value == "") {
    alert("Required Field");
    return 0;
  } else if (isNaN(value)) {
    alert("Must be a Number");
    return 0;
  } else return value;
}

function validate(resultYrobot1) {
  if (resultYrobot1 == null || resultYrobot1 == "") {
    alert("Required Field");
    return 0;
  } else if (isNaN(resultYrobot1)) {
    alert("resultYrobot1 must be a Number");
    return 0;
  } else return resultYrobot1;
}

function validate(resultYrobot2) {
  if (resultYrobot2 == null || resultYrobot2 == "") {
    alert("Required Field");
    return 0;
  } else if (isNaN(resultYrobot2)) {
    alert("resultYrobot2 must be a Number");
    return 0;
  } else return resultYrobot2;
}
