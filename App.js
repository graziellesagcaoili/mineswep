import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
//import { createGrid } from './GameLogic';

const App = () => {
    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('');
    const [bombs, setBombs] = useState('');
    const [grid, setGrid] = useState([]);
    const [revealedCells, setRevealedCells] = useState(0);

    const handleCellPress = (row, col) => {
        const updatedGrid = [...grid];
        updatedGrid[row][col].revealed = true; // Mark the cell as revealed

        if (updatedGrid[row][col].hasBomb) {
            // Revealed a bomb
            Alert.alert('Game Over', 'You revealed a bomb! Game over.');
        } else {
            // Increment revealed cells count for non-bomb cells
            setRevealedCells(revealedCells + 1);
        }

        setGrid(updatedGrid);
    };




    const createGrid = (rows, cols, bombs) => {
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

    // In your App component, make sure to pass the bombs value as an integer
    const handleStartGame = () => {
        if (rows && cols && bombs) {
            setGrid(createGrid(parseInt(rows, 10), parseInt(cols, 10), parseInt(bombs, 10)));
        } else {
            Alert.alert('Input Error', 'Please enter valid values for rows, columns, and bombs.');
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {!grid.length ? (
                <View>
                    <TextInput
                        placeholder="Rows"
                        keyboardType="numeric"
                        value={rows}
                        onChangeText={(text) => setRows(text)}
                    />
                    <TextInput
                        placeholder="Columns"
                        keyboardType="numeric"
                        value={cols}
                        onChangeText={(text) => setCols(text)}
                    />
                    <TextInput
                        placeholder="Bombs"
                        keyboardType="numeric"
                        value={bombs}
                        onChangeText={(text) => setBombs(text)}
                    />
                    <Button title="Start Game" onPress={handleStartGame} />
                </View>
            ) : (
                grid.map((row, rowIndex) => (
                    <View key={rowIndex} style={{ flexDirection: 'row' }}>
                        {row.map((cell, colIndex) => (
                            <TouchableOpacity
                                key={colIndex}
                                onPress={() => handleCellPress(rowIndex, colIndex)}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: cell.revealed ? 'lightgray' : 'lightgray',
                                }}
                            >
                                {cell.revealed && cell.hasBomb && (
                                    <Text>B</Text>
                                )}
                                {cell.revealed && !cell.hasBomb && (
                                    <Text>{cell.adjacentBombs}</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))
            )}
        </View>
    );
};

export default App;
