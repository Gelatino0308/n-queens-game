const board = document.querySelector("#chess-board");
const cellArr = [];
const hasQueen = [];
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
        hasQueen[cellArr.indexOf(cell)] = false;
        row.appendChild(cell);
    }
}
