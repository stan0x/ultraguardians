const startView = document.getElementById("startView");
const gameView = document.getElementById("gameView");
const gameOverView = document.getElementById("gameOverView");
const keyboardDiv = document.getElementById("keyboard");
const wordDisplay = document.getElementById("wordDisplay");
const livesDisplay = document.getElementById("livesDisplay");

function showView(view) {
  startView.classList.add("hideView");
  gameView.classList.add("hideView");
  gameOverView.classList.add("hideView");

  view.classList.remove("hideView");
  view.classList.add("showView");
}

let chosenWord = "HEJ"
let guessedLetters = [];
let wrongGuesses = 0;

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
  livesDisplay.textContent = `Fel: ${wrongGuesses} / 4`;
}

function handleGuess(letter, buttonX) {
  buttonX.disabled = true;

  if (chosenWord.includes(letter)) {
    guessedLetters.push(letter);
    buttonX.style.backgroundColor = "green";
  } else {
    wrongGuesses++;
    buttonX.style.backgroundColor = "red";

    if (wrongGuesses <= 4) {
      hangmanParts[wrongGuesses - 1].style.visibility = "visible";
    }
  }
  updateWordDisplay();
  updateLivesDisplay();
  checkGameEnd();  
}

function checkGameEnd() {
  if (legs.style.visibility === "visible") {
      document.getElementById("gameView").classList.remove("showView");
      document.getElementById("gameView").classList.add("hideView");
      document.getElementById("gameOverView").classList.add("showView");
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

document.getElementById("gameOverButton").addEventListener("click", () => {
    showView(startView);
});