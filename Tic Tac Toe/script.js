



// Variables to track game state
let currentPlayer = "X";
let xWins = 0;
let oWins = 0;
let gameState = Array(3).fill(null).map(() => Array(3).fill(null)); // 3x3 grid
let isGameOver = false;

// HTML Elements
const cells = document.querySelectorAll(".btn");
const playerTurnDisplay = document.getElementById("player-turn");
const xWinDisplay = document.getElementById("x-win-no");
const oWinDisplay = document.getElementById("o-win-no");

// Initialize the game
function initGame() {
  currentPlayer = "X";
  gameState = Array(3).fill(null).map(() => Array(3).fill(null));
  isGameOver = false;
  playerTurnDisplay.textContent = currentPlayer;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
    cell.disabled = false;
  });
}

// Check for a winner or draw
function checkGameStatus() {
  // Check rows, columns, and diagonals
  const winPatterns = [
    // Rows
    [gameState[0][0], gameState[0][1], gameState[0][2]],
    [gameState[1][0], gameState[1][1], gameState[1][2]],
    [gameState[2][0], gameState[2][1], gameState[2][2]],
    // Columns
    [gameState[0][0], gameState[1][0], gameState[2][0]],
    [gameState[0][1], gameState[1][1], gameState[2][1]],
    [gameState[0][2], gameState[1][2], gameState[2][2]],
    // Diagonals
    [gameState[0][0], gameState[1][1], gameState[2][2]],
    [gameState[0][2], gameState[1][1], gameState[2][0]],
  ];

  for (const pattern of winPatterns) {
    if (pattern.every(cell => cell === "X")) {
      xWins++;
      xWinDisplay.textContent = xWins;
      showOverlay(`${currentPlayer} Wins!`);
      highlightWinningCells(pattern);
      return true;
    } else if (pattern.every(cell => cell === "O")) {
      oWins++;
      oWinDisplay.textContent = oWins;
      showOverlay(`${currentPlayer} Wins!`);
      highlightWinningCells(pattern);
      return true;
    }
  }

  // Check for draw
  if (gameState.flat().every(cell => cell !== null)) {
    showOverlay("It's a Draw!");
    return true;
  }

  return false;
}

// Highlight winning cells
function highlightWinningCells(winningPattern) {
  cells.forEach(cell => {
    const [row, col] = cell.id.slice(-2).split("").map(Number);
    if (winningPattern.includes(gameState[row - 1][col - 1])) {
      cell.classList.add("winner");
    }
  });
}

// Show overlay for game results
function showOverlay(message) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  overlay.innerHTML = `
    <div class="overlay-content">
      <h2>${message}</h2>
      <button id="replay-btn">Play Again</button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Replay button
  document.getElementById("replay-btn").addEventListener("click", () => {
    document.body.removeChild(overlay);
    initGame();
  });

  isGameOver = true;
}

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (isGameOver) return;

    const [row, col] = cell.id.slice(-2).split("").map(Number);

    if (gameState[row - 1][col - 1] === null) {
      gameState[row - 1][col - 1] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.disabled = true;

      if (checkGameStatus()) {
        isGameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerTurnDisplay.textContent = currentPlayer;
    }
  });
});

// Start the game
initGame();











