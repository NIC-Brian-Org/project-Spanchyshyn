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

// This handler will be executed only once when the cursor
// moves over the unordered list
test.addEventListener("mouseenter", function(event) {
        // highlight the mouseenter target
        event.target.style.color = "purple";

        // reset the color after a short delay
        setTimeout(function() {
            event.target.style.color = "";
        }, 500);
    }, false);
// This handler will be executed every time the cursor
// is moved over a different list item
test.addEventListener("mouseover", function(event) {

        event.target.style.color = "orange";


        setTimeout(function() {
            event.target.style.color = "";
        }, 500);
    }, false);
