let score = 0;
let timeLeft = 5;
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const winPopup = document.getElementById("win-popup");

function moveTarget() {
    let x = Math.random() * (250);
    let y = Math.random() * (350);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

target.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
});

function startGame() {
    score = 0;
    timeLeft = 15;
    target.style.display = "block";
    const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showPopup();
        }
    }, 1000);
}


function showPopup() {
    document.getElementById('prizeText').innerText = `Congratulation you have click : ${score} targets`;
    winPopup.style.display = "block";
    target.style.display = "none";
}

function restartGame() {
    winPopup.style.display = "none";
    startGame();
}


moveTarget();
startGame();