
//Komma vidare från startskärm
//To do: Gör en funktion som kollar ID på knappen som blir klickad och styr vilka vyer som är synliga istället.
document.getElementById("startBtn").addEventListener('click', function () {
    document.getElementById("startScreen").classList.add("hideScreen");
    document.getElementById("gameScreen").classList.add("showScreen");
});


//Keyboard Keys
const keyboardKeys = document.querySelectorAll('#gameScreen .keyboard p');

keyboardKeys.forEach(keyboardKeys => {
    keyboardKeys.classList.add("keyboardBtn");
});