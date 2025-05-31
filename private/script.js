var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var rows = 6;
var columns = 7;
var currColumns = [];

var redPlayerColor = "#ff0000";
var yellowPlayerColor = "#ffd700";

window.onload = function () {
    document.getElementById("redColor").addEventListener("change", function () {
        redPlayerColor = this.value;
    });

    document.getElementById("yellowColor").addEventListener("change", function () {
        yellowPlayerColor = this.value;
    });

    setGame();
};

function setGame() {
    board = [];
    currColumns = Array(columns).fill(rows - 1);
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = ""; // clear old board

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(" ");
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            boardDiv.appendChild(tile);
        }
        board.push(row);
    }

    document.getElementById("winner").innerText = "";
    gameOver = false;
}

function setPiece() {
    if (gameOver) return;

    let [r, c] = this.id.split("-").map(Number);
    r = currColumns[c];
    if (r < 0) return;

    board[r][c] = currPlayer;
    let tile = document.getElementById(`${r}-${c}`);
    if (currPlayer === playerRed) {
        tile.style.backgroundColor = redPlayerColor;
        currPlayer = playerYellow;
    } else {
        tile.style.backgroundColor = yellowPlayerColor;
        currPlayer = playerRed;
    }

    currColumns[c]--;
    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== " " &&
                board[r][c] === board[r][c + 1] &&
                board[r][c + 1] === board[r][c + 2] &&
                board[r][c + 2] === board[r][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== " " &&
                board[r][c] === board[r + 1][c] &&
                board[r + 1][c] === board[r + 2][c] &&
                board[r + 2][c] === board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== " " &&
                board[r][c] === board[r + 1][c + 1] &&
                board[r + 1][c + 1] === board[r + 2][c + 2] &&
                board[r + 2][c + 2] === board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== " " &&
                board[r][c] === board[r - 1][c + 1] &&
                board[r - 1][c + 1] === board[r - 2][c + 2] &&
                board[r - 2][c + 2] === board[r - 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] === playerRed) {
        winner.innerText = "Player 1 Wins!";
        winner.style.color = redPlayerColor;
    } else {
        winner.innerText = "Player 2 Wins!";
        winner.style.color = yellowPlayerColor;
    }
    gameOver = true;
}
