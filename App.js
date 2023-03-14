import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';

import CustomButton from './Components/ButtonComponents';

import { StyleSheet, Button, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import styles from './Styles';


export default function App() {
  const [getText, setText] = useState('');

  const [getList, setList] = useState([]);

  const addItem = () => {
    setList([...getList, { key: Math.random().toString(), data: getText }]);
    // console.log('press');
    setText('');
  }

  const removeItem = (itemkey) => {
    var list = getList.filter(item => item.key != itemkey);
    setList(list);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-do</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Enter the Item" onChangeText={text => setText(text)} value={getText}>

        </TextInput>
        {/* <CustomButton text='New' /> */}
        {/* <CustomButton text="Add" onPress={addItem} styles={styles.btn} /> */}
        <Button title="Add" onPress={addItem} styles={styles.btn} />
      </View>
      <View>
        <Text style={{ fontSize: 20 }}>{getText}</Text>
      </View>
      <ScrollView styles={styles.scrollview}>
        {getList.map((item) =>
          <TouchableOpacity key={item.key} activeOpacity={0.6} >

            <View style={styles.scroolViewItem}  >
              <Text style={styles.scroolViewText}>
                {item.data}
              </Text>
              <TouchableOpacity onPress={() => removeItem(item.key)}>
                <View style={styles.crossTextcontainer

                }>
                  <Text style={styles.crossText}>X
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>)}
      </ScrollView>

    </View>
  );
}


