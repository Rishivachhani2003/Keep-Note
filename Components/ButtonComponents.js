import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// import 

const CustomButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.5}>
            <View style={{ ...styles.buttonContainer, backgroundColor: props.color }}>
                <Text style={styles.buttonText}>{props.text} </Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    buttonContainer: {

        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    buttonText: {
        color: '#ffff',
        // color: colors.white,
        fontSize: 20,
    },


})

export default CustomButton;