const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function checkWinner() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameActive = false;
      statusText.textContent = `Player ${board[a]} wins!`;
      return;
    }
  }
  if (!board.includes('')) {
    isGameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!board[index] && isGameActive) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (isGameActive) {
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player X's turn`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
statusText.textContent = `Player ${currentPlayer}'s turn`;
