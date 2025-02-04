const board = document.getElementById("game-board");
const selector = document.getElementById("image-selector");
const referenceImage = document.getElementById("reference-image");
const progressText = document.getElementById("progress");
const winPopup = document.getElementById("win-popup");
let tiles = Array.from({ length: 25 }, (_, i) => i);
let imageUrl = selector.value;
let selectedTile = null;

let width = window.innerWidth;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    console.log(`width = ${width} = (width % 5) ${Math.floor(width / 5)}`);
    board.innerHTML = "";
    referenceImage.style.backgroundImage = `url(${imageUrl})`;
    tiles.forEach((num, i) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.draggable = true;
        tile.dataset.index = i;
        tile.dataset.correctIndex = num;

        let x, y;
        if (width >= 768) {
            console.log(`   Big Screen`);
            x = (num % 5) * -120;
            y = Math.floor(num / 5) * -120;
        }
        // else if (width >= 768 && width <= 1024) { // Tablet range
        //     console.log(`   Tablet Screen`);
        //     x = (num % 5) * -100;
        //     y = Math.floor(num / 5) * -100;
        // } 
        else { // Phone screen (width < 770)
            console.log(`   Phone Screen`);
            x = (num % 5) * -65;
            y = Math.floor(num / 5) * -65;
        }


        // console.log(`   x = ${x} y = ${y}`);
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundPosition = `${x}px ${y}px`;

        tile.addEventListener("click", tileClick);

        // tile.addEventListener("dragstart", dragStart);
        // tile.addEventListener("dragover", dragOver);
        // tile.addEventListener("drop", drop);

        board.appendChild(tile);
    });

    updateProgress();
}

function tileClick(event) {
    const clickedTile = event.target;
    if (selectedTile) {
        if (selectedTile !== clickedTile) {
            swapTiles(selectedTile, clickedTile);
            selectedTile.classList.remove("selected");
            selectedTile = null;
        } else {
            selectedTile.classList.remove("selected");
            selectedTile = null;
        }
    } else {
        selectedTile = clickedTile;
        selectedTile.classList.add("selected");
    }
}

function swapTiles(tile1, tile2) {
    const index1 = tile1.dataset.index;
    const index2 = tile2.dataset.index;
    [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];
    createBoard();
    checkWin();
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
