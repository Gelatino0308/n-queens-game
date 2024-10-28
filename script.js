const board = document.querySelector("#chess-board");
const clearButton = document.querySelector("#clear-board");
const resizeBoard = document.querySelector("#resize-board");

let boardSize = 8;
let lastCellIndex = boardSize - 1;
const cellArr = [];
let positionArr = [];

changeSize(boardSize)

function changeSize(boardSize) {

    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    for (let i = 0; i < boardSize; i++){
        const row =  document.createElement("div");
        row.classList.add("grid-row");
        board.appendChild(row);
        const rowArr = [];

        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");

            if (i % 2 === 0 && j % 2 === 1 || i % 2 === 1 && j % 2 === 0) {
                cell.classList.add("darkcells");
            }
            else {
                cell.classList.add("lightcells");
            }

            row.appendChild(cell);
            rowArr.push(cell);
        }
        cellArr.push(rowArr);
    }
}

board.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const targetCell = e.target.classList.contains('queenIcon') ? e.target.parentElement : e.target;
    const { rowIndex, colIndex } = findTargetIndexes(targetCell);
    const hasQueen = targetCell.querySelector("img");

    if (!hasQueen) {
        createQueen(targetCell);
        positionArr.push({ rowIndex, colIndex });
        highlightQueenRange(rowIndex, colIndex);
    }
    else {
        targetCell.removeChild(targetCell.firstChild);
        targetCell.style.alignItems = "";
        clearAllHighlights(false);

        positionArr = positionArr.filter((loc) => loc.rowIndex !== rowIndex || loc.colIndex !== colIndex); 
        positionArr.forEach(({ rowIndex, colIndex}) => {
            highlightQueenRange(rowIndex, colIndex);
        });
    }
});

function createQueen (target) {
    const queenImg = document.createElement("img");
    queenImg.src = "./images/queen.svg";
    queenImg.classList.add("queenIcon");
    target.style.alignItems = "flex-end";
    target.textContent = ''
    target.appendChild(queenImg);
}

function findTargetIndexes (target) {
    for (let rowIndex = 0; rowIndex < cellArr.length; rowIndex++) {
        let colIndex = cellArr[rowIndex].indexOf(target);
        if (colIndex !== -1){
            return { rowIndex, colIndex };
        }
    }
}

function clearAllHighlights(all) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            cellArr[i][j].classList.remove("inRangeCells");
            if (!cellArr[i][j].querySelector("img")) {
                cellArr[i][j].textContent = '';
            }

            if (all && cellArr[i][j].firstChild) {
                cellArr[i][j].removeChild(cellArr[i][j].firstChild)
                positionArr = []
                cellArr[i][j].style.alignItems = "";
            }
        }
    }
}

function checkInput() {
    let input = prompt("Enter the new dimension size (min: 2, max: 20):");

    if (input) {
        input = input.trim();
        let parsedInput = parseInt(input);
        if (Number.isInteger(parsedInput) && input === parsedInput.toString()) {
            if (input < 2 || input > 20) {
                alert("Input out of range. Enter dimension size greater than or equal to 2 and less than or equal to 20.");
                checkInput();
            }
            else {
                boardSize = input;
                lastCellIndex = boardSize - 1;
                changeSize(input);
            }
        }
        else {
            alert("Only non-negative integer values from 2-20 are allowed. Please enter correct value!");
            checkInput();
        }
    }
}

function highlightQueenRange(rowIdx, colIdx) {
    for (let i = 0; i < boardSize; i++) {
        if (!cellArr[i][colIdx].querySelector("img")) {
            cellArr[i][colIdx].textContent = "×";
        }

        if (!cellArr[rowIdx][i].querySelector("img")) {
            cellArr[rowIdx][i].textContent = "×";
        }

        cellArr[i][colIdx].classList.add("inRangeCells");
        cellArr[rowIdx][i].classList.add("inRangeCells");
    }

    highlightL2RDiagonal(rowIdx, colIdx, 0, 0);
    highlightR2LDiagonal(rowIdx, colIdx, 0, lastCellIndex);
}

function highlightL2RDiagonal (row, col, startRowIndex, startColIndex) {
    const indexDifference = row - col;
    indexDifference >= 0 ? startRowIndex = indexDifference : startColIndex = Math.abs(indexDifference);

    while (startRowIndex <= lastCellIndex && startColIndex <= lastCellIndex) {
        placeHighlight(startRowIndex, startColIndex);
        startRowIndex += 1;
        startColIndex += 1;
    }
}

function highlightR2LDiagonal (row, col, startRowIndex, startColIndex) {
    const indexSum = row + col;
    indexSum <= lastCellIndex ? startColIndex = indexSum : startRowIndex = indexSum - lastCellIndex;

    while (startRowIndex <= lastCellIndex && startColIndex >= 0) {
        placeHighlight(startRowIndex, startColIndex);
        startRowIndex += 1;
        startColIndex -= 1;
    }
}

function placeHighlight (rowIdx, colIdx) {
    cellArr[rowIdx][colIdx].classList.add("inRangeCells");
    if (!cellArr[rowIdx][colIdx].querySelector("img")) {
        cellArr[rowIdx][colIdx].textContent = "×";
    }
}

clearButton.addEventListener("click", () => {
    clearAllHighlights(true);
});

resizeBoard.addEventListener("click", checkInput);