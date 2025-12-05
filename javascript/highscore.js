const gameOverButton = document.getElementById('gameOverButton');
const playerNameInput = document.getElementById('playerName');
const sortScoreBtn = document.getElementById("sortScoreBtn");
const sortDateBtn = document.getElementById("sortDatebtn");

const KEY = 'highscores';
import { wrongGuesses } from "./hangman.js";
import { wordLength } from "./hangman.js";

// Change button depending on whether the player has entered something or not
playerNameInput.addEventListener('input', () => {
    if (playerNameInput.value === '') {
        gameOverButton.textContent = "Återgå till Start";
    } else {
        gameOverButton.textContent = "Skicka Highscore";
    }
});


//Sort highscore by score
sortScoreBtn.addEventListener('click', () => {
    let highscores = JSON.parse(localStorage.getItem(KEY)) || [];
    highscores.sort((a, b) => a.playerScore - b.playerScore);
    localStorage.setItem(KEY, JSON.stringify(highscores));
    showHighscore();
})

//Sort highscore by date
sortDateBtn.addEventListener('click', () => {
    let highscores = JSON.parse(localStorage.getItem(KEY)) || [];
    highscores.sort((a, b) => new Date(a.time) - new Date(b.time));
    localStorage.setItem(KEY, JSON.stringify(highscores));
    showHighscore();
});

//Click on return button
gameOverButton.addEventListener('click', () => {

    //Reset the button
    gameOverButton.textContent = "Återgå till Start"
    
    //Get name
    const name = playerNameInput.value.trim();
    if (name == '') return;

    //Get date and time
    const time = new Date().toISOString();
    
    //Get word length
    const wordL = wordLength;

    //Get score
    const playerScore = wrongGuesses;


    let highscores = JSON.parse(localStorage.getItem(KEY)) || [];
  
    const newHighscoreEntry = {
        name, wordL, playerScore, time, 
    };

    //Add the name to the array
    highscores.unshift(newHighscoreEntry);

    //Sort
    highscores.sort((a, b) => a.playerScore - b.playerScore);

    //Limit highscores to 5 entries
    if (highscores.length > 5) {
        highscores.splice(5, highscores.length)
    }

    //Send the list back to localStorage
    localStorage.setItem(KEY, JSON.stringify(highscores));

    //Reset input
    playerNameInput.value = '';

    //Show new highscore
    showHighscore();
});


//Function to print score
function showHighscore() {
    const highscores = JSON.parse(localStorage.getItem(KEY)) || [];
    const highscoreList = document.getElementById("highscore");

    // Clear the list first
    highscoreList.innerHTML = "";

    highscores.forEach((name) => {
        const spelare = document.createElement("li");
        spelare.innerHTML = `${name.name} &lpar; ${name.playerScore}p &rpar; ${name.time} <br> Ordlängd: ${name.wordL}`;
        highscoreList.appendChild(spelare);
    });
}


//Show highscore when page loads
showHighscore();