window.score = 0;


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
  wordLength = chosenWord.length;
  
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

// gör en css class som blinkar
function blinkScreen(colorClass, callback) {
  document.body.classList.add(colorClass);
  
// om 2 sek tar bort classen och går vidare till nästa skrev
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

