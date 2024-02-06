/**
 * \file input.js
 * \author Grazielle Agcaoili
 * \date 2024-02-01
 * \brief a input component for the size of the grid
 *  **/

import { useState } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export const InputBox = () => {

    return (
        <View>
            <TextInput style={styles.input} />
        </View>
       
        );
}

const styles = StyleSheet.create({
    input: {
        width: 180,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
       
    },
});