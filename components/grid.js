// GridScreen.js
import {useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createGrid } from '../functions/createGrid';
import QuitButton from './quitButton';
import Cell from './cell';


const Grid = (params ) => {
    const navigation = useNavigation();
    const [rows, setRows] = useState(params.rows);
    const [cols, setCols] = useState(params.cols);
    const [bombs, setBombs] = useState(params.bombs);
    const [grid, setGrid] = useState([]);
    const [revealedCells, setRevealedCells] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false); 
   // const [initials, setInitials] = useState('');

    // Function to update highest score
    const updateHighestScore = (newScore) => {
        if (newScore > highestScore) {
            setHighestScore(newScore);
        }
    };

    const handleStartTime = () => {
        const currentTime = Date.now();
        //console.log('Starting time:', currentTime);
        setStartTime(currentTime);
    };

    const handleQuitGame = () => {

        setGrid([]);
        setRows('');
        setCols('');
        setBombs('');
        setRevealedCells(0);
        if (navigation && navigation.goBack) {
            navigation.goBack();
        } else {
            console.log('Navigation object or goBack method is undefined');
        }
    };


    const handleCellPress = (row, col) => {
        if (gameOver) return; // Disable cell press if game over

        const updatedGrid = [...grid];
        updatedGrid[row][col].revealed = true; // Mark the cell as revealed

        if (updatedGrid[row][col].hasBomb) {
            // Revealed a bomb
            Alert.alert('Game Over', 'Its a bomb! Game over.');
            setGameOver(true); 
        } else {
            // Increment revealed cells count for non-bomb cells
            setRevealedCells(revealedCells + 1);
            // Increment score
            setScore(score + 10); // Adjust points earned per tile revealed that is not a bomb

            // Check if the player wants to continue
            Alert.alert(
                'Chicken Dinner',
                'Do you want to continue?',
                [
                    {
                        text: 'No',
                        onPress: () => handleQuitGame(), // Only quit if player chooses No
                        style: 'cancel',
                    },
                    {
                        text: 'Yes',
                        onPress: () => console.log('Continue pressed'),
                    },
                ],
                { cancelable: false }
            );
        }

        setGrid(updatedGrid);
    };




    const calculateScore = () => {
        //console.log('Calculating score...');
        const secondsElapsed = Math.floor(elapsedTime / 1000);
        const deduction = secondsElapsed * 5; // Deduct 5 points every second
        const initialScore = revealedCells * 10; // Initial score based on revealed cells
        const finalScore = Math.max(initialScore - deduction, 0); // Ensure score doesn't go below 0
        updateHighestScore(finalScore); // Update highest score
        //console.log('Score:', finalScore);
        if (finalScore > highestScore) {
            setHighestScore(finalScore);
            AsyncStorage.setItem('highestScore', finalScore.toString());
            AsyncStorage.setItem('playerInitials', params.initials);
           
        }
        return finalScore;
    };




    useEffect(() => {
        console.log('Elapsed time:', elapsedTime);
        let timer;
        if (startTime) {
            timer = setInterval(() => {
                console.log('Interval triggered');
                const currentTime = Date.now();
                setElapsedTime(currentTime - startTime); // Update elapsed time
            }, 5000); // Update elapsed time every 5 seconds
        }
        return () => clearInterval(timer);
    }, [startTime, revealedCells, elapsedTime]); // Include revealedCells dependency to recalculate score when revealedCells changes




    useEffect(() => {
        // Initialize the grid when component mounts
        setGrid(createGrid(parseInt(rows), parseInt(cols), parseInt(bombs)));
    }, [rows, cols, bombs]);

    useEffect(() => {
        handleStartTime();
        AsyncStorage.getItem('highestScore').then((value) => {
            if (value !== null) {
                setHighestScore(parseInt(value));
            }
        });
    }, []);



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {grid.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row' }}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            revealed={cell.revealed}
                            hasBomb={cell.hasBomb}
                            adjacentBombs={cell.adjacentBombs}
                            onPress={() => handleCellPress(rowIndex, colIndex)}
                            disabled={gameOver}
                        />
                    ))}
                </View>
            ))}
            <QuitButton onPress={handleQuitGame} />
            <Text>Score: {calculateScore()}</Text>
            <Text>Highest Score: {highestScore}</Text>
        </View>
    );

};

export default Grid;
