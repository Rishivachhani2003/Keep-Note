import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';


import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Button, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
const styles = StyleSheet.create({
    title: {
        fontSize: 64,
        color: '#A7CBD9'
    },
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#ffff',
        // backgroundColor: colors.white,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    inputContainer: {
        // flex: 1,
        flexDirection: 'row',
        // width: '70%',
        margin: 20,
        marginLeft: 30,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    textInput: {
        flex: 1,
        padding: 10,
        borderRadius: 30,
        margin: 10,
        alignItems: 'center',
        borderColor: '#000',
        // borderColor: colors.black,
        borderWidth: 2,
        width: '100%',
        fontSize: 16,
    },
    btn: {
        borderRadius: 5,
        width: 20,
        height: 20,
        color: '#A7CBD9'

    },
    scrollview: {
        width: '100%',

    },
    scroolViewItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FF7F50',
        // backgroundColor: colors.orange,
        width: '80%',
        alignSelf: 'center',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    scroolViewText: {
        fontSize: 20,
        width: '70%',
        color: '#000',
        // color: co/lors.black,
    },
    crossTextcontainer: {
        backgroundColor: '#000',
        // backgroundColor: colors.blue,
        borderRadius: 50,
        padding: 5,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    crossText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5733',
        // color: colors.red,
    },


});

export default styles;