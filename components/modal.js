import React, { useState } from 'react';
import { View, Modal, Text, Button, StyleSheet } from 'react-native';

const InstructionModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => onClose()}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Instructions:</Text>
                    <Text>- Enter the number of rows and columns for the grid.</Text>
                    <Text>- Specify the number of bombs you want in the grid.</Text>
                    <Text>- Click on 'Start Game' to begin playing.</Text>
                    <Button title="Close" onPress={() => onClose()} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent bg
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5, // for Android
    },
    modalText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default InstructionModal;
