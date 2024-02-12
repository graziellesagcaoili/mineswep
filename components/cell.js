// Cell.js

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Cell = ({ revealed, hasBomb, adjacentBombs, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: revealed ? 'red' : 'lightgray',
            }}
        >
            {revealed && hasBomb && (
                <Text>B</Text>
            )}
            {revealed && !hasBomb && (
                <Text>{adjacentBombs}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Cell;
