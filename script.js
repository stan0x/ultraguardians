
//Komma vidare från startskärm
//To do: Gör en funktion som kollar ID på knappen som blir klickad och styr vilka vyer som är synliga istället.
document.getElementById("startBtn").addEventListener('click', function () {
    document.getElementById("startScreen").classList.add("hideScreen");
    document.getElementById("gameScreen").classList.add("showScreen");
});

//Info-knappen
document.getElementById("infoBtn").addEventListener('click', function () {
    document.getElementById("infOverlay").classList.add("showScreen")
});

document.getElementById("infoReturnBtn").addEventListener('click', function () {
    document.getElementById("infOverlay").classList.remove("showScreen")
    document.getElementById("infOverlay").classList.add("hideScreen")
});

//To do: Flytta kod här nedan vidare till en egen JS fil där Game-view koden ligger?

//Keyboard Keys
const keyboardKeys = document.querySelectorAll('#gameScreen .keyboard p');

keyboardKeys.forEach(keyboardKeys => {

    //Ge alla knappar samma styling
    keyboardKeys.classList.add("keyboardBtn");

    //Klickar man på en knapp så blir den aktiv, Dvs får klassen activeKey.
    //To do: Lägga till all funktionalitet här.
    keyboardKeys.addEventListener('click', function() { 
        keyboardKeys.classList.add("activeKey");
    }
    );
});