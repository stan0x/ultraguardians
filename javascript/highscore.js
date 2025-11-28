const gameOverButton = document.getElementById('gameOverButton');
const playerNameInput = document.getElementById('playerName');
const KEY = 'highscores';

// Ändra knapp beroende på om spelaren skrivit något eller inte
playerNameInput.addEventListener('input', () => {
    if (playerNameInput.value === '') {
        gameOverButton.textContent = "Återgå till Start";
    } else {
        gameOverButton.textContent = "Skicka Highscore";
    }
});

//Klick på återgå knapp
gameOverButton.addEventListener('click', () => {

    //Återställ knappen
    gameOverButton.textContent = "Återgå till Start"
    
    //Få namn
    const name = playerNameInput.value.trim();
    if (name == '') return;

    //Få datum och tid
    const now = new Date();
    const time = now.getFullYear() + " " + now.getDate() + "/" + now.getMonth() + " " + now.getHours() + ":" + now.getMinutes();

    //få Ordlängd
    const wordLength = window.wordLength;

    //få Score
    const playerScore = window.score;


    let highscores = JSON.parse(localStorage.getItem(KEY)) || [];
  
    const newHighscoreEntry = {
        name, wordLength, playerScore, time, 
    };

    //lägg namnet till arrayen
    highscores.unshift(newHighscoreEntry);

    //sortera
    highscores.sort((a, b) => a.score - b.score);

    //Korta ner highscores till 5 entries
    if (highscores.length > 5) {
        highscores.splice(5, highscores.length)
    }

    //skicka tillbaka listan till 
    localStorage.setItem(KEY, JSON.stringify(highscores));

    //Nollställ input
    playerNameInput.value = '';

    //Visa ny highscore
    showHighscore();
});


//funktion för att printa score
function showHighscore() {
    const highscores = JSON.parse(localStorage.getItem(KEY)) || [];
    const highscoreList = document.getElementById("highscore");

    highscoreList.innerHTML = ""; // rensa listan först

    highscores.forEach((name) => {
        const spelare = document.createElement("li");
        spelare.innerHTML = `${name.name} &lpar; ${name.playerScore}p &rpar; ${name.time} <br> Ordlängd: ${name.wordLength}`;
        highscoreList.appendChild(spelare);
    });
}


//Visa highscore då sidan laddas
showHighscore();