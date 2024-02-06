/**
 * \file box.js
 * \author Grazielle Agcaoili
 * \date 2024-02-01
 * \brief a box component for the mineswep problem
 *  **/

import { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';


export const Box = ({ id, isSelected }) => {
    //const [state, setState] = useState(false);

    return (
        <Pressable style={[styles.box, isSelected ? styles.selected : styles.plain]}
            onPress={() => { setState()}}
        />
    );
}

const styles = StyleSheet.create({
    box: {
        height: 50,
        width: 50,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1
    },
    selected: {
        backgroundColor: 'blue',
    },
    palin: {
        backgroundColor: 'pink',
    }
})