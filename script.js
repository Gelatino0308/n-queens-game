const board = document.querySelector("#chess-board");
let boardSize = 8;
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

        rowArr.push(cell);
        row.appendChild(cell);
    }
    cellArr.push(rowArr);
}

board.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const targetCell = e.target.classList.contains('queenIcon') ? e.target.parentElement : e.target;
    const hasQueen = targetCell.hasChildNodes();

    if (!hasQueen) {
        const queenImg = document.createElement("img");
        queenImg.src = "queen.svg";
        
        queenImg.classList.add("queenIcon");
        targetCell.appendChild(queenImg);

        const { rowIndex, colIndex } = findTargetIndexes(targetCell);
        positionArr.push({ rowIndex, colIndex });
        highlightQueenRange(rowIndex, colIndex, !hasQueen);
    }
    else {
        targetCell.removeChild(targetCell.firstChild);
        const { rowIndex, colIndex } = findTargetIndexes(targetCell);
        positionArr = positionArr.filter((loc) => loc.rowIndex !== rowIndex || loc.colIndex !== colIndex); 

        clearAllHighlights();

        positionArr.forEach(({ rowIndex, colIndex}) => {
            highlightQueenRange(rowIndex, colIndex, !hasQueen);
        });
    }
    


});

function findTargetIndexes (target) {
    for (let rowIndex = 0; rowIndex < cellArr.length; rowIndex++) {
        let colIndex = cellArr[rowIndex].indexOf(target);
        if (colIndex !== -1){
            return { rowIndex, colIndex };
        }
    }
}

function highlightQueenRange(rowIdx, colIdx, hasQueen) {

    for (let i = 0; i < boardSize; i++) {
        if (hasQueen) {
            cellArr[i][colIdx].classList.add("inRangeCells");
            cellArr[rowIdx][i].classList.add("inRangeCells");
        }
        else {
            cellArr[i][colIdx].classList.remove("inRangeCells");
            cellArr[rowIdx][i].classList.remove("inRangeCells");
        }
    }

    highlightL2RDiagonal(rowIdx, colIdx, 0, 0, hasQueen);
    highlightR2LDiagonal(rowIdx, colIdx, 0, 7, hasQueen);
}

function highlightL2RDiagonal (row, col, startRowIndex, startColIndex, hasQueen) {
    const indexDifference = row - col;

    if (indexDifference >= 0) {
        startRowIndex = indexDifference;
    }
    else {
        startColIndex = Math.abs(indexDifference);
    }

    while (startRowIndex <= 7 && startColIndex <= 7) {
        // console.log(cellArr[startRowIndex][startColIndex]);
        if (hasQueen) {
            cellArr[startRowIndex][startColIndex].classList.add("inRangeCells");
        }
        else {
            cellArr[startRowIndex][startColIndex].classList.remove("inRangeCells");
        }
        startRowIndex += 1;
        startColIndex += 1;
    }
}


function highlightR2LDiagonal (row, col, startRowIndex, startColIndex, hasQueen) {
    const indexSum = row + col;

    if (indexSum <= 7) {
        startColIndex = indexSum;
    }
    else {
        startRowIndex = indexSum - 7;
    }

    while (startRowIndex <= 7 && startColIndex >= 0) {
        // console.log(cellArr[startRowIndex][startColIndex]);
        if (hasQueen){
            cellArr[startRowIndex][startColIndex].classList.add("inRangeCells");
        }
        else {
            cellArr[startRowIndex][startColIndex].classList.remove("inRangeCells");
        }
        startRowIndex += 1;
        startColIndex -= 1;
    }
}

function clearAllHighlights() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            cellArr[i][j].classList.remove("inRangeCells");
        }
    }
}
