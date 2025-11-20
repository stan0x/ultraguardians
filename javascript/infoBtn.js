document.getElementById("infoBtn").addEventListener('click', function () {
    document.getElementById("infOverlay").classList.add("showView")
});

document.getElementById("infoReturnBtn").addEventListener('click', function () {
    document.getElementById("infOverlay").classList.remove("showView")
    document.getElementById("infOverlay").classList.add("hideView")
});