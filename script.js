const board = document.querySelector("#chess-board");
let boardSize = 8;
const cellArr = [];

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

    if (!(targetCell.hasChildNodes())) {
        const queenImg = document.createElement("img");
        queenImg.src = "queen.svg";
        
        queenImg.classList.add("queenIcon");
        targetCell.appendChild(queenImg);

        highlightQueenRange(targetCell);
    }
    else {
        targetCell.removeChild(targetCell.firstChild);
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

function highlightQueenRange(targetCell) {
    let {rowIndex, colIndex} = findTargetIndexes(targetCell);
    for (let i = 0; i < boardSize; i++) {
        cellArr[i][colIndex].style.backgroundColor = "red";
        cellArr[rowIndex][i].style.backgroundColor = "red";
    }

    const indexDifference = rowIndex - colIndex;
    let startRowIndex = 0;
    let startColIndex = 0;

    if (indexDifference >= 0) {
        startRowIndex = indexDifference;
    }
    else {
        startColIndex = Math.abs(indexDifference);
    }

    while (startRowIndex <= 7 && startColIndex <= 7) {
        console.log(cellArr[startRowIndex][startColIndex]);
        cellArr[startRowIndex][startColIndex].style.backgroundColor = "red";
        startRowIndex += 1;
        startColIndex += 1;
    }
}
