const board = document.querySelector("#chess-board");
let boardSize = 10;
const lastCellIndex = boardSize - 1;
const cellArr = [];
let positionArr = [];

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

board.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const targetCell = e.target.classList.contains('queenIcon') ? e.target.parentElement : e.target;
    const { rowIndex, colIndex } = findTargetIndexes(targetCell);
    const hasQueen = targetCell.hasChildNodes();

    if (!hasQueen) {
        createQueen(targetCell);
        positionArr.push({ rowIndex, colIndex });
        highlightQueenRange(rowIndex, colIndex);
    }
    else {
        targetCell.removeChild(targetCell.firstChild);
        clearAllHighlights();

        positionArr = positionArr.filter((loc) => loc.rowIndex !== rowIndex || loc.colIndex !== colIndex); 
        positionArr.forEach(({ rowIndex, colIndex}) => {
            highlightQueenRange(rowIndex, colIndex);
        });
    }
});

function createQueen (target) {
    const queenImg = document.createElement("img");
    queenImg.src = "queen.svg";
    queenImg.classList.add("queenIcon");
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

function clearAllHighlights() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            cellArr[i][j].classList.remove("inRangeCells");
        }
    }
}

function highlightQueenRange(rowIdx, colIdx) {
    for (let i = 0; i < boardSize; i++) {
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
        cellArr[startRowIndex][startColIndex].classList.add("inRangeCells");
        startRowIndex += 1;
        startColIndex += 1;
    }
}

function highlightR2LDiagonal (row, col, startRowIndex, startColIndex) {
    const indexSum = row + col;
    indexSum <= lastCellIndex ? startColIndex = indexSum : startRowIndex = indexSum - lastCellIndex;

    while (startRowIndex <= lastCellIndex && startColIndex >= 0) {
        cellArr[startRowIndex][startColIndex].classList.add("inRangeCells");
        startRowIndex += 1;
        startColIndex -= 1;
    }
}
