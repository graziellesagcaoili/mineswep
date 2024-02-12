

export const createGrid = (rows, cols, bombs) => {
    const grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ hasBomb: false }))
    );

    // Assign bombs to random cells
    let bombsPlaced = 0;
    while (bombsPlaced < bombs) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        if (!grid[randomRow][randomCol].hasBomb) {
            grid[randomRow][randomCol].hasBomb = true;
            bombsPlaced++;
        }
    }

    return grid;
};
