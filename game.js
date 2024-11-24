const board = document.querySelectorAll('.cell');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = '❌'; // Игрок начинает с "❌"
let boardState = Array(9).fill(null); // Состояние игрового поля

// Возможные выигрышные комбинации
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-cell');

    // Проверяем, занята ли ячейка
    if (boardState[cellIndex] || winnerDisplay.textContent) return;

    // Обновляем состояние ячейки
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    // Проверяем победителя
    if (checkWinner()) {
        winnerDisplay.textContent = `Переможець: ${currentPlayer}!`;
        return;
    }

    // Проверяем на ничью
    if (boardState.every(cell => cell)) {
        winnerDisplay.textContent = 'Нічия!';
        return;
    }

    // Меняем игрока
    currentPlayer = currentPlayer === '❌' ? '⭕️' : '❌';
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === currentPlayer);
    });
}

function resetGame() {
    boardState.fill(null);
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    winnerDisplay.textContent = '';
    currentPlayer = '❌';
}

// Добавляем обработчики событий
board.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
