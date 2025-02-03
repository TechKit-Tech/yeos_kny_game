const board = document.getElementById("game-board");
const selector = document.getElementById("image-selector");
const referenceImage = document.getElementById("reference-image");
const progressText = document.getElementById("progress");
const winPopup = document.getElementById("win-popup");
let tiles = Array.from({ length: 25 }, (_, i) => i);
let imageUrl = selector.value;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    board.innerHTML = "";
    referenceImage.style.backgroundImage = `url(${imageUrl})`;
    tiles.forEach((num, i) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.draggable = true;
        tile.dataset.index = i;
        tile.dataset.correctIndex = num;

        const x = (num % 5) * -80;
        const y = Math.floor(num / 5) * -80;
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundPosition = `${x}px ${y}px`;

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("drop", drop);

        board.appendChild(tile);
    });
    updateProgress();
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.dataset.index);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData("text");
    const toIndex = event.target.dataset.index;

    if (fromIndex !== toIndex) {
        [tiles[fromIndex], tiles[toIndex]] = [tiles[toIndex], tiles[fromIndex]];
        createBoard();
        checkWin();
    }
}

function checkWin() {
    const tileElements = document.querySelectorAll(".tile");
    if ([...tileElements].every(tile => tile.dataset.correctIndex == tile.dataset.index)) {
        setTimeout(() => showPopup(), 100);
    }
    updateProgress();
}

function updateProgress() {
    const tileElements = document.querySelectorAll(".tile");
    const correctTiles = [...tileElements].filter(tile => tile.dataset.correctIndex == tile.dataset.index).length;
    const percentage = Math.floor((correctTiles / 25) * 100);
    progressText.textContent = `Progress: ${percentage}%`;
}

function showPopup() {
    winPopup.style.display = "block";
}

function restartGame() {
    winPopup.style.display = "none";
    shuffle(tiles);
    createBoard();
}

selector.addEventListener("change", (e) => {
    imageUrl = e.target.value;
    shuffle(tiles);
    createBoard();
});

shuffle(tiles);
createBoard();
