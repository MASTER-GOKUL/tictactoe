let winCountX = 0;
let winCountO = 0;
let activeP = "X";
let active = true;
let board = [];
let gridSize = 3;

const start = document.getElementById('startButton');
const pop = document.getElementById('pop');
const closeP = document.getElementById('closeP');

start.addEventListener('click', function() {
    const playerXName = document.getElementById('playerXName').value;
    const playerOName = document.getElementById('playerOName').value;
    
    document.getElementById('playerXNameDisplay').innerText = playerXName;
    document.getElementById('playerONameDisplay').innerText = playerOName;
    Gstart();
});

const reset = document.getElementById('restartButton');
reset.addEventListener('click', function() {
    Greset();
});

function Gstart() {
    gridSize = parseInt(document.getElementById("gridSize").value);
    if (gridSize > 7) {
        gridSize = 7;
    }
    create(gridSize);
    Greset();
}

function create(size) {
    const boardElement = document.getElementById("board");
    boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    boardElement.innerText = "";
    board = Array(size * size).fill("");

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}`;
        cell.onclick = () => makeMove(i);
        boardElement.appendChild(cell);
    }
}

function makeMove(index) {
    if (board[index] === "" && active) {
        board[index] = activeP;
        document.getElementById(`cell-${index}`).innerText = activeP;
        document.getElementById(`cell-${index}`).style.backgroundColor = activeP === "X" ? "red" : "blue";
    }
    checkResult();
    if (active) {
        activeP = activeP === "X" ? "O" : "X";
        changePlayer();
    }
}

function checkResult() {
    const win = checkWin(gridSize);

    for (let value of win) {
        const [a, b, c, ...rest] = value;
        if (board[a] && value.every(index => board[index] === board[a])) {
            value.forEach(index => document.getElementById(`cell-${index}`).style.backgroundColor = "green");

            const playerXName = document.getElementById('playerXName').value;
            const playerOName = document.getElementById('playerOName').value;
            const winnerName = activeP === "X" ? playerXName : playerOName;

            document.getElementById('popupText').innerText = `${winnerName} wins!`;
	    
            if(activeP === "X") {
                winCountX++;
                document.getElementById('popupText').style.color = "Red";
            } else {
                winCountO++;
                document.getElementById('popupText').style.color = "Blue";
            }
	    
            document.getElementById('winCount').innerText = `${winCountX}   vs   ${winCountO}`;
            pop.style.display = 'block';
            active = false;
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById('popupText').innerText = `It is a draw!! Play again`;
        document.getElementById('popupText').style.color = "yellow";
        pop.style.display = 'block';
        active = false;
    }
}

function checkWin(size) {
    const winArr = [];

    // Rows
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(i * size + j);
        }
        winArr.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
        const column = [];
        for (let j = 0; j < size; j++) {
            column.push(j * size + i);
        }
        winArr.push(column);
    }

    // Diagonals
    const d1 = [];
    const d2 = [];
    for (let i = 0; i < size; i++) {
        d1.push(i * size + i);
        d2.push(i * size + (size - i - 1));
    }
    winArr.push(d1);
    winArr.push(d2);

    return winArr;
}

function changePlayer() {
    const pX = document.getElementById("playerX");
    const pO = document.getElementById("playerO");
const pXNameDisplay = document.getElementById("playerXNameDisplay");
    const pONameDisplay = document.getElementById("playerONameDisplay");
    if (activeP === "X") {
        pX.classList.add("active");
        pXNameDisplay.classList.add("active");
        pO.classList.remove("active");
        pONameDisplay.classList.remove("active");
    } else {
        pX.classList.remove("active");
        pXNameDisplay.classList.remove("active");
        pO.classList.add("active");
        pONameDisplay.classList.add("active");
    }
}

function displayMessage(message) {
    document.getElementById("message").innerText = message;
}

function Greset() {
    activeP = activeP === "X" ? "O" : "X";  // Alternate starting player
    active = true;
    board.fill("");
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor = "rgb(251, 94, 4)";
    });
    displayMessage("");
    changePlayer();
}

// For pop-up block

closeP.addEventListener('click', () => {
    pop.style.display = 'none';
    Greset();  // Reset the game after closing the popup
});

window.addEventListener('click', (event) => {
    if (event.target === pop) {
        pop.style.display = 'none';
        Greset();  // Reset the game after closing the popup
    }
});
