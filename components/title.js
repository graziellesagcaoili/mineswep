import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Title = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mineswept</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFB6C1',
    },
});

export default Title;
