// GameLogic.js
export const createGrid = (rows, cols, bombs) => {
    const grid = Array(rows)
        .fill()
        .map(() => Array(cols).fill(false));

    let bombsPlaced = 0;

    while (bombsPlaced < bombs) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        if (!grid[row][col]) {
            grid[row][col] = true;
            bombsPlaced++;
        }
    }

    return grid;
};
