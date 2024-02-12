import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaderboardScreen = () => {
    const [highestScore, setHighestScore] = useState(0);
    const [playerInitials, setPlayerInitials] = useState('');

    useEffect(() => {
        // Retrieve highest score and player initials from AsyncStorage
        AsyncStorage.multiGet(['highestScore', 'playerInitials']).then((values) => {
            const storedHighestScore = parseInt(values[0][1]) || 0;
            const storedPlayerInitials = values[1][1] || '';
            setHighestScore(storedHighestScore);
            setPlayerInitials(storedPlayerInitials);
        });
    }, [highestScore, playerInitials]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Initials:</Text>
                    <Text style={styles.infoText}>{playerInitials}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Highest Score:</Text>
                    <Text style={styles.infoText}>{highestScore}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
   
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    infoLabel: {
        fontSize: 18,
        marginRight: 10,
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LeaderboardScreen;
