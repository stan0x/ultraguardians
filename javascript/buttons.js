//To do: Gör en funktion för att byta views

//Info button
document.getElementById("infoBtn").addEventListener('click', function () {
    document.getElementById("infOverlay").classList.add("showView");
});

//Info button close
document.getElementById("infoReturnBtn").addEventListener('click', function () {
    document.getElementById("infOverlay").classList.remove("showView");
    document.getElementById("infOverlay").classList.add("hideView");
});

// Starta spelet knappen
document.getElementById("startBtn").addEventListener('click', function () {
    document.getElementById("startView").classList.remove("showView");
    document.getElementById("startView").classList.add("hideView");
    document.getElementById("gameView").classList.add("showView");
});

// Återgå då spelet är över button
document.getElementById("gameOverButton").addEventListener('click', function () {
    document.getElementById("gameOverView").classList.remove("showView");
    document.getElementById("gameOverView").classList.add("hideView");
    document.getElementById("startView").classList.add("showView");
});