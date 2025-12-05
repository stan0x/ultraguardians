//To do: Create a function to switch views

//Info button
document.getElementById("infoBtn").addEventListener('click', function () {
    document.getElementById("infOverlay").classList.add("showView");
});

//Info button close
document.getElementById("infoReturnBtn").addEventListener('click', function () {
    document.getElementById("infOverlay").classList.remove("showView");
    document.getElementById("infOverlay").classList.add("hideView");
});

// Start game button
document.getElementById("startBtn").addEventListener('click', function () {
    document.getElementById("startView").classList.remove("showView");
    document.getElementById("startView").classList.add("hideView");
    document.getElementById("gameView").classList.add("showView");
});

// Return when game is over button
document.getElementById("gameOverButton").addEventListener('click', function () {
    document.getElementById("gameOverView").classList.remove("showView");
    document.getElementById("gameOverView").classList.add("hideView");
    document.getElementById("startView").classList.add("showView");
});