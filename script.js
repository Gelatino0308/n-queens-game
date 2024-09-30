const board = document.querySelector("#chess-board");
const cellArr = [];
let boardSize = 8;

for (let i = 0; i < boardSize; i++){
    const row =  document.createElement("div");
    row.classList.add("grid-row");
    board.appendChild(row);

    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");

        if (i % 2 === 0 && j % 2 === 1 || i % 2 === 1 && j % 2 === 0) {
            cell.classList.add("darkcells");
        }
        else {
            cell.classList.add("lightcells");
        }

        cellArr.push(cell);
        row.appendChild(cell);
    }
}

board.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const targetCell = e.target.classList.contains('queenIcon') ? e.target.parentElement : e.target;

    if (!(targetCell.hasChildNodes())) {
        const queenImg = document.createElement("img");
        queenImg.src = "queen.svg";
        
        queenImg.classList.add("queenIcon");
        targetCell.appendChild(queenImg);
    }
    else {
        targetCell.removeChild(targetCell.firstChild);
    }
});
