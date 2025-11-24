let chosenWord = "HEJ"
let guessedLetters = [];
let wrongGuesses = 0;

const wordDisplay = document.getElementById("wordDisplay");


const hangmanParts = [
  document.getElementById("head"),
  document.getElementById("body"),
  document.getElementById("arms"),
  document.getElementById("legs"),
  ]

  function resetHangman() {
    hangmanParts.forEach(p => p.style.visibility = "hidden"
    )
  }

function startGame() {
  chosenWord = "HEJ";
  guessedLetters = [];
  wrongGuesses = 0;

  createKeyboard();
  resetHangman();
  updateWordDisplay();
  updateLivesDisplay();
  showView(gameView);
}

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

function updateLivesDisplay() {
  const livesDisplay = document.getElementById("livesDisplay");
  livesDisplay.textContent = `Fel: ${wrongGuesses} / ${hangmanParts.length}`;
}

function handleGuess(letter, buttonX) {
  buttonX.disabled = true;

  if (chosenWord.includes(letter)) {
    guessedLetters.push(letter);
    buttonX.style.backgroundColor = "green";
  } else {
    wrongGuesses++;
    buttonX.style.backgroundColor = "red";

    if (wrongGuesses <= hangmanParts.length) {
      hangmanParts[wrongGuesses - 1].style.visibility = "visible";
    }
  }
  updateWordDisplay();
  updateLivesDisplay();
  checkGameEnd();
}

function checkGameEnd() {
  if (chosenWord.split("").every(l => guessedLetters.includes(l))) {
    showView(gameOverView);
    gameOverView.querySelector("h2").textContent = "Du vann!";
  } 
  if (wrongGuesses >= hangmanParts.length) {
    showView(gameOverView);
    gameOverView.querySelector("h2").textContent = 
    `Du är en idiot - Ordet var: ${chosenWord}`;
  }
}