const gameOverButton = document.getElementById('gameOverButton');
const playerNameInput = document.getElementById('playerName');
const KEY = 'highscores';

gameOverButton.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (name == '') return;
    
    let highscores = JSON.parse(localStorage.getItem(KEY)) || [];
  
    //lägg namnet till arrayen
    highscores.unshift(name);

    //lägg till sortering efter score här, väntar på att poäng är en variabel vi kan använda.


    //Korta ner highscores till 5 entries
    if (highscores.length > 5) {
        highscores.splice(5, highscores.length)
    }

    //skicka tillbaka listan till 
    localStorage.setItem(KEY, JSON.stringify(highscores));

    playerNameInput.value = '';
    showHighscore();
    //To do: Ta bort den här koden
    console.log("Highscores:", highscores);
});


//funktion för att printa score
function showHighscore() {
    const highscores = JSON.parse(localStorage.getItem(KEY)) || [];
    const highscoreList = document.getElementById("highscore");

    highscoreList.innerHTML = ""; // rensa listan först

    highscores.forEach((name) => {
        const spelare = document.createElement("li");
        spelare.textContent = name;
        highscoreList.appendChild(spelare);
    });
}


//Kör en gång innan det laddas
showHighscore();