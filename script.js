"use strict";
// Coding with help of Vanilla Javascript hangman Game tutorial Youtube//
var plants = [
  "Plantae",

  "Bryophytes",

  "fungi",

  "conifers",

  "algae",

  "bacteria",

  "ferns",

  "hornworts",

  "prokaryotes",

  "photosynthetic",

  "Angiosperms",

  "Gymnosperms",

  "Pteridophytes",

  "multicelluar",
];

let answer = "";

let maxWrong = 6;

let mistakes = 0;

let guessed = [];

let wordStatus = null;


function randomWord() {
  answer =
    plants[
      Math.floor(Math.random() * plants.length)
    ];
}

function newFunction() {
  new BugController; { 'minBugs'; 10, 'maxBugs'; 50, 'mouseOver'; 'die'; };
}

function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
   
         <button
   
           class="btn btn-lg btn-primary m-2"
   
           id='` +
        letter +
        `'
   
           onClick="handleGuess('` +
        letter +
        `')"
   
         >
   
           ` +
        letter +
        `
   
         </button>
   
       `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

  document.getElementById(chosenLetter).setAttribute("disabled", true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();

    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;

    updateMistakes();

    checkIfGameLost();

    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = "./images/" + mistakes + ".jpg";
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "You Won!!!";
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("wordSpotlight").innerHTML =
      "The answer was: " + answer;

    document.getElementById("keyboard").innerHTML = "You Lost!!!";
  }
}

function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

function reset() {
  mistakes = 0;

  guessed = [];

  document.getElementById("hangmanPic").src = "./images/0.jpg";

  randomWord();

  guessedWord();

  updateMistakes();

  generateButtons();
}

document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord();

generateButtons();

guessedWord();

let test = document.getElementById("list");

test.addEventListener("mouseover", function (event) {
  //highlight the mouseover target
  event.target.style.color = "red";
}, false);

test.addEventListener("mouseout", function (event) {
  // highlight the mouseout target
  event.target.style.color = "black";
}, false);

function $(id) { return document.getElementById(id); };
const media = document.getElementById('audio');

let ui = {
  play: 'playAudio',
  audio: 'audio',
  percentage: 'percentage',
  seekObj: 'seekObj',
  currentTime: 'currentTime'
};

function togglePlay() {
  if (media.paused === false) {
    media.pause();
    $(ui.play).classList.remove('pause');
  } else {
    media.play();
    $(ui.play).classList.add('pause');
  }
}

function calculatePercentPlayed() {
  let percentage = (media.currentTime / media.duration).toFixed(2) * 100;
  $(ui.percentage).style.width = `${percentage}%`;
}

function calculateCurrentValue(currentTime) {
  const currentMinute = parseInt(currentTime / 60) % 60;
  const currentSecondsLong = currentTime % 60;
  const currentSeconds = currentSecondsLong.toFixed();
  const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
  currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;
  
  return currentTimeFormatted;
}

function initProgressBar() {
  const currentTime = calculateCurrentValue(media.currentTime);
  $(ui.currentTime).innerHTML = currentTime;
  $(ui.seekObj).addEventListener('click', seek);

  media.onended = () => {
    $(ui.play).classList.remove('pause');
    $(ui.percentage).style.width = 0;
    $(ui.currentTime).innerHTML = '00:00';
  };

  function seek(e) {
    const percent = e.offsetX / this.offsetWidth;
    media.currentTime = percent * media.duration;
  }
  
  calculatePercentPlayed();
}

$(ui.play).addEventListener('click', togglePlay)
$(ui.audio).addEventListener('timeupdate', initProgressBar);

  