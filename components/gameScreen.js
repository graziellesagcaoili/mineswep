// GameScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import Grid from './grid';

const GameScreen = ({ route }) => {
    const {initials, rows, cols, bombs } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Grid initials={initials} rows={rows} cols={cols} bombs={bombs} />
        </View>
    );
};

export default GameScreen;
