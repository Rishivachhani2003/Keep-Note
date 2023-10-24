// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { useState } from 'react';
// import CustomButton from './Components/ButtonComponents';
// import { StyleSheet, Button, Text, View, TouchableOpacity, TextInput, ScrollView, Keyboard } from 'react-native';
// // import {todoItems }from './constants/dummyTodo'
// import styles from './Styles';

// export default function App() {

//   const [getText, setText] = useState('');

//   const [getList, setList] = useState([]);
//   const [editingitem, setEditingItem] = useState(-1);

//   const addItem = () => {
//     setList([...getList, { key: Math.random().toString(), data: getText }]);

//     setText('');
//     Keyboard.dismiss();
//   }

//   const removeItem = (itemkey) => {
//     var list = getList.filter(item => item.key != itemkey);
//     setList(list => getList.filter(item => itemkey != itemkey));
//   }

//   const editItems = (item) => {
//     setText(item.data);
//     setEditingItem(item.key);
//   }

//   const updateItem = () => {
//     setList(list => getList.map(item => itemkey === editItems
//       ? { key: item.key, data: getText }
//       : item));
//   }

//   // setText('');
//   // setEditingItem(0);

//   const scrollView = (
//     <ScrollView styles={styles.scrollview}>
//       {getList.map((item, index) =>

//         <TouchableOpacity
//           key={item.key}
//           activeOpacity={0.6}
//           onPress={() => editItems(item)} >

//           <View style={styles.scroolViewItem}  >
//             <Text style={styles.scroolViewText}>{index + 1}:
//               {item.data}
//             </Text>
//             <TouchableOpacity onPress={() => removeItem(item.key)}>
//               <View style={styles.crossTextcontainer

//               }>
//                 <Text style={styles.crossText}>X
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>)}
//     </ScrollView>
//   );

//   const emptyScrollView = (
//     <View style={{ padding: 10 }}>
//       <Text style={{ fontStyle: 'italic', fontSize: 20, color: 'grey' }}> No to-do items ! hurray </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>To-do</Text>
//       <View style={styles.inputContainer}>
//         <TextInput style={styles.textInput} placeholder="Enter the Item" onChangeText={text => setText(text)} value={getText}>

//         </TextInput>
//         {/* <CustomButton text='New' /> */}
//         {/* <CustomButton text="Add" onPress={addItem} styles={styles.btn} /> */}
//         <Button title="Add"
//           onPress={addItem}
//           styles={styles.btn} disabled={getText.length <= 0} />

//         {/* <Button title="Update" onPress={updateItem} styles={styles.btn} /> */}
//       </View>
//       {/* <View>
//         <Text style=
//         {{ fontSize: 20 }}>{getText}</Text>
//       </View> */}

//       {getList.length <= 0 ? emptyScrollView : scrollView}

//     </View>

//   );
// }
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Pressable,
  Button,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import NoteItem from "./Components/NoteItem";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const win = Dimensions.get("window");

export default function App() {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    if (title.length < 3 || desc.length < 3) {
      Alert.alert(
        "OOPS!",
        "Title and description must be at least 3 characters long.",
        [{ text: "Ok" }]
      );
    } else {
      setData((prev) => [
        {
          noteTitle: title,
          noteText: desc,
          key: Date.now().toString(),
        },
        ...prev,
      ]);
      toggleModal();
      setTitle("");
      setDesc("");
    }
  };
  const getData = async () => {
    try {
      let data = await AsyncStorage.getItem("savedNotes");
      if (data !== null) {
        setData(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    storeData();
  }, [data]);
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("savedNotes", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBar}>
        <Text style={styles.titleText}>Short Notes</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NoteItem item={item} setData={setData} data={data} />
        )}
      />
      <Pressable style={styles.bottomBar} onPress={toggleModal}>
        <Text style={styles.plus}>+</Text>
      </Pressable>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.titleText}>Create a Short Note</Text>
          <TextInput
            placeholder="Note Title"
            value={title}
            onChangeText={(val) => setTitle(val)}
            style={styles.inputField}
          />
          <TextInput
            placeholder="Note Description"
            multiline={true}
            value={desc}
            onChangeText={(val) => setDesc(val)}
            style={styles.inputField}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={toggleModal} color="#0e132b" />
            <Button title="Add Note" onPress={handleSubmit} color="#0e132b" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    backgroundColor: "#0e132b",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: win.width,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 100,
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e132b",
  },
  plus: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
  inputField: {
    marginVertical: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
