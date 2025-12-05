window.score = 0;


// Code for the hangman game // Get HTML elements
const startView = document.getElementById("startView");
const gameView = document.getElementById("gameView");
const gameOverView = document.getElementById("gameOverView");
const keyboardDiv = document.getElementById("keyboard");
const wordDisplay = document.getElementById("wordDisplay");
const livesDisplay = document.getElementById("livesDisplay");

// Switch between views
function showView(view) {
  startView.classList.add("hideView");
  gameView.classList.add("hideView");
  gameOverView.classList.add("hideView");

  view.classList.remove("hideView");
  view.classList.add("showView");
}

// Game variables
let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
let wordLength = 0;
export {wrongGuesses, wordLength};

const wordPool = [ "TÖNT", "TOMTE", "TOFFEL", "SAND" ]

const hangmanParts = [
  document.getElementById("scaffold"),
  document.getElementById("head"),
  document.getElementById("body"),
  document.getElementById("arms"),
  document.getElementById("legs"),
  ]

  // Hide the hangman at the start of each game
  function resetHangman() {
    hangmanParts.forEach(p => p.style.visibility = "hidden"
    )
  }

  // Start the game and choose a word, reset everything
function startGame() {
  chosenWord = wordPool[Math.floor(Math.random() * wordPool.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  wordLength = chosenWord.length;
  
  createKeyboard();
  resetHangman();
  updateWordDisplay();
  updateLivesDisplay();
  showView(gameView);
}

// Display the word with _ _ _ _
function updateWordDisplay() {
  let display = chosenWord

  .split("")
  .map(l => {
    if (guessedLetters.includes(l)) {
        return l;
    } else {
        return "_"; 
    }
})
  .join(" ")

  wordDisplay.textContent = display;
  }

  // Show how many mistakes have been made
function updateLivesDisplay() {
  livesDisplay.textContent = `Mistakes: ${wrongGuesses} / 5`;
}

// What happens when you click a letter
function handleGuess(letter, buttonX) {
  buttonX.disabled = true;

  if (chosenWord.includes(letter)) {
    guessedLetters.push(letter);
    buttonX.style.backgroundColor = "green";

  } else {
    wrongGuesses++;
    buttonX.style.backgroundColor = "red";


    if (wrongGuesses <= 5) {
      hangmanParts[wrongGuesses - 1].style.visibility = "visible";
    }
  }
  updateWordDisplay();
  updateLivesDisplay();
  checkGameEnd();  
}

// Create a CSS class that blinks
function blinkScreen(colorClass, callback) {
  document.body.classList.add(colorClass);
  
// After 2 seconds remove the class and continue to next screen
  setTimeout(() => {
    document.body.classList.remove(colorClass);
    callback(); 
  }, 2000);
}

function showGameOver(won) {
  gameView.classList.remove("showView");
  gameView.classList.add("hideView");

  gameOverView.classList.add("showView");

  if (won) {
    document.querySelector("#gameOverView h2").innerHTML =
      `Du vann!<p>ordet var: ${chosenWord}<p>Fel gissningar: ${wrongGuesses}`;
  } else {
    document.querySelector("#gameOverView h2").innerHTML =
      `Game over!<p>ordet var: ${chosenWord}<p>Fel gissningar: ${wrongGuesses}`;
  }
}

function checkGameEnd() {

  const allLettersGuessed = chosenWord
    .split("")
    .every(letter => guessedLetters.includes(letter));

  if (allLettersGuessed) {
    blinkScreen("blink-green", () => {
      showGameOver(true);
    });
    return;
  }

  if (wrongGuesses === 5) {
    blinkScreen("blink-red", () => {
      showGameOver(false);
    });
  }
}


const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",
                 "Q","R","S","T","U","V","W","X","Y","Z","Å","Ä","Ö"];

function createKeyboard() {
  keyboardDiv.innerHTML = "";
  letters.forEach(letter => {
    const p = document.createElement("p");
    p.textContent = letter;
    p.classList.add("keyboardBtn");

    p.addEventListener("click", () => {
      handleGuess(letter, p);
    });

    keyboardDiv.appendChild(p);    
  });
}

document.getElementById("startBtn").addEventListener("click", startGame); 

