import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const { nickName, userId } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");

  const createComment = async () => {
    await addDoc(collection(db, "posts", postId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <TouchableOpacity style={styles.sendBtn} onPress={createComment}>
        <Text style={styles.sendTitle}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#20b2aa",
  },
  sendBtn: {
    marginHorizontal: 30,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  sendTitle: {
    color: "#20b2aa",
    fontFamily: "PD-Regular",
    fontSize: 26,
  },
});

export default CommentsScreen;
