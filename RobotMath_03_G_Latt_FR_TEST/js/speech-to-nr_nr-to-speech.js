// ++++++++++++++++++++++++++++++ SPEECH TO NUMBER ++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var numbers = [ '0', '1' , '2' , '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '45', '46', '47', '48'];
var grammar = '#JSGF V1.0; grammar numbers; public <numbers.digits> = ' + numbers.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
// recognition.continuous = false;
//// SEE AT LINE 276
//// recognition.lang = 'en-US';
//// recognition.lang = 'fr-FR';
//// recognize.lang = "en-GB";

recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
numbers.forEach(function(v, i, a){
  //// console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});


function recognitionStart() {
  recognition.start();
  console.log('Ready to receive a number.');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  var valueXstudentResult = event.results[0][0].transcript;
  valueXstudent = (valueXstudentResult.replace(",", "."));
  diagnostic.textContent = valueXstudent;
  bg.style.backgroundColor = valueXstudent;
  console.log('Confidence: ' + event.results[0][0].confidence);

  document.getElementById("IDvalueXstudentBig").innerHTML = valueXstudent;
  document.getElementById("IDvalueTeacher1").value = valueXstudent;

  //// DO THE MATH (function) ////
  mathResult();

  // ++++++++++++++++++++++++++++++ MATH ++++++++++++++++++++++++++++++++++ //
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
  function mathResult(){
    //// var valueTeacher1 = document.getElementById('IDvalueTeacher1').value;
    var valueTeacher1 = valueXstudent;
    var operatorTeacher1 = document.getElementById('IDoperatorTeacher1').value;
    var valueTeacher2 = document.getElementById('IDvalueTeacher2').value;

    //// document.getElementById('result').innerHTML = parseFloat(value1) + parseFloat(value2);

    var valueTeacher1Num = parseFloat(valueTeacher1).toFixed(2);
    var valueTeacher2Num = parseFloat(valueTeacher2).toFixed(2);

    var stringResult = valueTeacher1Num + ' ' + operatorTeacher1 + ' ' + valueTeacher2Num;

    // take out anything other than digits, (), -+/* and .
    // https://stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval
    var stringResultReplace = stringResult.replace(/[^-()\d/*+.]/g, '');
    //// alert(eval(str));
    stringResultEval = eval(stringResultReplace);
    //// document.getElementById('IDmathResult').innerHTML = stringResultEval;

    //// zero/Zero/ZERO ---> 0 ////
    let stringResultLast = stringResultEval;
    let pattern1 = /zero/i;
    let stringResultLast1 = stringResultLast.match(pattern1);
    if (stringResultLast1 == "zero") {
      stringResultLast2 = 0;
    } else if (stringResultLast1 == "zéro") {
      stringResultLast2 = 0;
      } else if (stringResultLast1 == "Zero") {
        stringResultLast2 = 0;
        } else if (stringResultLast1 == "Zéro") {
          stringResultLast2 = 0;
          } else if (stringResultLast1 == "ZERO") {
            stringResultLast2 = 0;
            } else {
              stringResultLast2 = stringResultLast;
            }
    //// zero/Zero/ZERO ---> 0 ////
    document.getElementById('IDmathResult').innerHTML = stringResultLast2;


    //// MISSCHIEN NOG NODIG ////
    //// resultYrobot1and2Rounder = Math.round(((resultYrobot1and2Round * resultYrobot1and2Round) / resultYrobot1and2Round) * 100.) / 100.;
  }

  //// VALIDATOR //// ! OPNIEUW INSTELLEN INDIEN BOVENSTAANDE WERKT !
  function validate(value) {
    if (value == null || value == "") {
      alert("Required Field");
      return 0;
    } else if (isNaN(value)) {
      alert("Must be a Number");
      return 0;
    } else return value;
  }
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
  // ++++++++++++++++++++++++++++++ MATH ++++++++++++++++++++++++++++++++++ //

  document.getElementById('IDmathResult').innerHTML = stringResultEval;
  setTimeout(function(){
    speak();
  }, 2000);

}
/* ERROR [Deprecation] speechSynthesis.speak() without user activation is no longer allowed since M71, around December 2018. See https://www.chromestatus.com/feature/5687444770914304 for more details
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var beginText = "Hi, i am Nautilius, the first iteration from Robot Math. Please fill in the Operator and Number fields, then click Listen.";
document.getElementById('IDmathResult').innerHTML = beginText;
setTimeout(function(){
document.getElementById("ButtonSpeak").click();
}, 4000); // Wait x seconds
*/

recognition.onspeechend = function() {
  recognition.stop();
  document.getElementById("IDmathResult").innerHTML = "S'il vous plaît, donnez-moi un nouveau numéro !";
  setTimeout(function(){
    speak();
    //// document.getElementById("ButtonSpeak").click();
  }, 10000); // Wait x seconds
  setTimeout(function(){
    recognition.start();
}, 12000); // Wait x seconds
}

recognition.onnomatch = function(event) {
  recognition.stop();
  diagnostic.textContent = "Je n'ai pas reconnu ce numéro.";
  document.getElementById("IDmathResult").innerHTML = "Je n'ai pas reconnu ce numéro.";
  setTimeout(function(){
    speak();
    //// document.getElementById("ButtonSpeak").click();
  }, 1000); // Wait x seconds
  setTimeout(function(){
    recognition.start();
}, 2000); // Wait x seconds
}

recognition.onerror = function(event) {
  recognition.stop();
  diagnostic.textContent = "Une erreur s'est produite lors de la reconnaissance : " + event.error;
  document.getElementById("IDmathResult").innerHTML = "Une erreur s'est produite lors de la reconnaissance : " + event.error;
  setTimeout(function(){
    speak();
    //// document.getElementById("ButtonSpeak").click();
  }, 1000); // Wait x seconds
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++ SPEECH TO NUMBER ++++++++++++++++++++++++++++++++++ //



// ++++++++++++++++++++++++++++++ NUMBER TO SPEECH ++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#IDmathResult');
const voiceSelect = document.querySelector('#IDvoiceSelect');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option menu element
    const option = document.createElement('option');
    // Fill option menu with voice name and voice language
    option.textContent = voice.name + ' (' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    return;
  }
  if (textInput.value !== '') {
    // Add background animation
    body.style.background = 'url(./img/wave.gif)';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundSize = '100% 160%';
    //// body.style.backgroundPosition = 'center 270px';
    body.style.background = 'rgb(24, 24, 24)';
    speech2number.style.backgroundColor = 'transparent';
    number2speech.style.backgroundColor = 'transparent';

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = e => {
      //// body.style.backgroundImage = `linear-gradient(to right, #0acffe 0%, #495aff 100%)`;
      body.style.background = 'rgb(24, 24, 24)';
      speech2number.style.backgroundColor = 'rgb(47, 47, 47)';
      number2speech.style.backgroundColor = 'rgb(47, 47, 47)';
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );
    selectedVoiceLang = voiceSelect.selectedOptions[0].getAttribute(
      'data-lang'
    );
    recognition.lang = selectedVoiceLang;
    //// console.log('line 276', selectedVoiceLang);
    //// document.getElementById("voice=select").selectedIndex = 13; // Option Français

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS
//// HINTS ===> MAKEN IN ENGELS EN FRANS NAARGELANG DE GEKOZEN TAAL?
//// hints.innerHTML = 'Please fill in the "Operator" and "Number" fields, then click "Listen".';
IDmathResult.innerHTML = "Bonjour, je suis un robot qui parle les maths.";
setTimeout(function(){
  document.getElementById('IDvoiceSelect').selectedIndex = 4;
  speak();
  //// document.getElementById("ButtonSpeak").click();
}, 4000); // Wait x seconds

// Text form submit
//// window.onload=function(){
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});
//// }

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++ NUMBER TO SPEECH ++++++++++++++++++++++++++++++++++ //


// ++++++++++++++++++++++++++++++ TIPS ++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++ TIPS ++++++++++++++++++++++++++++++++++ //


// ++++++++++++++++++++++++++++++ TEST ++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
//// AUTO CLICK TEST ! ////
/*
for ( let i = 0; i < 1; i++ ) {
document.getElementById("clickMe").click();
}

or

$(document).ready(function(){
$('#some-id').trigger('click');
});
*/
//// AUTO CLICK TEST ! ////
//// AUTO SPEAK TEST ! ////
//// https://stackoverflow.com/questions/1847893/js-events-hooking-on-value-change-event-on-IDmathResults
// Put a first value
//////// document.getElementById("IDmathResult").value="Hi, i am Nautilius, the first iteration from Robot Math";
//// setTimeout(function(){
//// speak();
////}, 4000); // Wait x seconds

// Detect and 'remember' old value every x seconds
//// setInterval(function() { // Test if really needed
//// var oldVal = $('#IDmathResult').val();
//// //// setTimeout(function(){
// Your script that changes the value
// document.getElementById("IDmathResult").value="the first iteration from Robot Math";
////  if(oldVal != $('#IDmathResult').val())
////   {
// The value has changed, do something
//// console.log("Value was changed");
//// setTimeout(speak(), 2000);
//// }
//// }, 1000); // Wait x seconds
//// }, 2000); // Repeat every x seconds // Test if really needed

//// $("body").on('change propertychange input paste ', '#IDmathResult', function(){    // 3rd way
//// console.log("Value was changed again");
////  speak();
//// });

//// AUTO SPEAK TEST ! ////
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// ++++++++++++++++++++++++++++++ TEST ++++++++++++++++++++++++++++++++++ //
