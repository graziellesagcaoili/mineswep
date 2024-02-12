// SetupScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Leaderboard from './leaderboard';
import InstructionModal from './modal'
import Title from './title'

const SetupScreen = ({ navigation }) => {
    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('');
    const [bombs, setBombs] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [initials, setInitials] = useState('');

    useEffect(() => {
        // Fetch leaderboard data from AsyncStorage
        const fetchLeaderboardData = async () => {
            try {
                const data = await AsyncStorage.getItem('leaderboardData');
                if (data) {
                    setLeaderboardData(JSON.parse(data));
                }
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };
        fetchLeaderboardData();
    }, []);

    const validateInput = (text) => {
        const numericValue = parseInt(text, 10);
        if (numericValue >= 3 && numericValue <= 9) {
            return true;
        }
        return false;
    };

 

    const handleStartGame = () => {
        // Validate input and navigate to the game screen
        if (rows && cols && bombs) {
            navigation.navigate('Game', { rows, cols, bombs, initials });
            const newPlayer = { initials, score: 0 }; // Initialize score to 0
            const updatedData = [...leaderboardData, newPlayer];
            setLeaderboardData(updatedData);
            try {
               AsyncStorage.setItem('leaderboardData', JSON.stringify(updatedData));
            } catch (error) {
                console.error('Error updating leaderboard data:', error);
            }
        } else {
            alert('Please enter valid values for rows, columns, and bombs.');
        }
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Reset input fields
            setRows('');
            setCols('');
            setBombs('');
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title/>
                <View style={styles.button}>
                <Button title="Show Instructions" onPress={() => setModalVisible(true)} color="#FFB6C1" />
                <InstructionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
                </View>
            <Leaderboard data={leaderboardData} />
                
            <Text>Enter the number of rows, columns, and bombs:</Text>
            <TextInput
                placeholder="Enter Player Initials"
                value={initials}
                onChangeText={setInitials}
                    maxLength={2} // Limit initials characters; 
                    style={styles.input}
            />
            <TextInput
                placeholder="Rows"
                keyboardType="numeric"
                value={rows}
                onChangeText={(text) => {
                    if (validateInput(text)) {
                        setRows(text);
                    }
                }}
                style={styles.input}
            />
            <TextInput
                placeholder="Columns"
                keyboardType="numeric"
                value={cols}
                onChangeText={(text) => {
                    if (validateInput(text)) {
                        setCols(text);
                    }
                }}
                style={styles.input}
            />
            <TextInput
                placeholder="Bombs"
                keyboardType="numeric"
                value={bombs}
                onChangeText={setBombs}
                style={styles.input}
                />
                <View style={styles.button}>
                    <Button title="Start Game" onPress={handleStartGame} color="#FFB6C1" />
                 </View>
            </View>
        </ScrollView>
    );
};


export default SetupScreen;

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        width: 180,
    },
    button: {
        borderRadius: 5,
        overflow: 'hidden',
        elevation: 3, //for Android
    },

});
