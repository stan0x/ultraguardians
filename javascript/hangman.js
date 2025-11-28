// gör koden till själva hänggubben//  Hämtar HTML elementen
const startView = document.getElementById("startView");
const gameView = document.getElementById("gameView");
const gameOverView = document.getElementById("gameOverView");
const keyboardDiv = document.getElementById("keyboard");
const wordDisplay = document.getElementById("wordDisplay");
const livesDisplay = document.getElementById("livesDisplay");

// byter mellan skärmana
function showView(view) {
  startView.classList.add("hideView");
  gameView.classList.add("hideView");
  gameOverView.classList.add("hideView");

  view.classList.remove("hideView");
  view.classList.add("showView");
}

// spelets variabler
let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

const wordPool = [ "TÖNT", "TOMTE", "TOFFEL", "SAND" ]

const hangmanParts = [
  document.getElementById("scaffold"),
  document.getElementById("head"),
  document.getElementById("body"),
  document.getElementById("arms"),
  document.getElementById("legs"),
  ]

  // gömmer hangmannen i början av varje spel
  function resetHangman() {
    hangmanParts.forEach(p => p.style.visibility = "hidden"
    )
  }

  // startar spelet och väljer ett ord, resettar allting
function startGame() {
  chosenWord = wordPool[Math.floor(Math.random() * wordPool.length)];
  guessedLetters = [];
  wrongGuesses = 0;

  //Skicka hur långt ordet är
  window.wordLength = chosenWord.length;
  
  createKeyboard();
  resetHangman();
  updateWordDisplay();
  updateLivesDisplay();
  showView(gameView);
}

// visa ordet med _ _ _ _
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

  // visar hur många fel en gjort
function updateLivesDisplay() {
  livesDisplay.textContent = `Fel: ${wrongGuesses} / 5`;
}

// det som händer när man klickar en bokstav
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

function checkGameEnd() {
  if (legs.style.visibility === "visible") {

      //Uppdatera score
      window.score = wrongGuesses;
      
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

