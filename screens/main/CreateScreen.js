import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";

// Redux
import { useSelector } from "react-redux";

// Location
import * as Location from "expo-location";

// Firebase
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreateScreen = ({ navigation }) => {
  const { userId, nickName } = useSelector((state) => state.auth);
  const [urlSnap, setUrlSnap] = useState(null);
  const [photoUri, setPhoto] = useState(null);
  const [photoURLServer, setPhotoURLServer] = useState(null);
  const [comment, setComment] = useState("");

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await urlSnap.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
  };

  const uploadPostToServer = async () => {
    await uploadPhotoToServer();
    await addDoc(collection(db, "posts"), {
      userId,
      photo: photoURLServer,
      comment,
      location: location.coords,
      nickName,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photoUri);
    const file = await response.blob();
    const storageRef = ref(storage, `post_image/${file._data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setPhotoURLServer(downloadURL)
        );
      }
    );
  };

  return (
    <View style={style.container}>
      <Camera style={style.camera} ref={setUrlSnap}>
        {photoUri && (
          <View style={style.takePhoto}>
            <Image
              source={{ uri: photoUri }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <TouchableOpacity style={style.snapContainer} onPress={takePhoto}>
          <Text style={style.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <View style={style.inputContainer}>
          <TextInput style={style.input} onChangeText={setComment} />
        </View>
        <TouchableOpacity style={style.sendBtn} onPress={sendPhoto}>
          <Text style={style.sendTitle}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "70%",
    marginTop: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snapContainer: {
    marginBottom: 20,
    width: 70,
    height: 70,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#fff",
  },
  snap: {
    color: "#fff",
    fontFamily: "PD-Regular",
    fontSize: 20,
  },
  takePhoto: {
    position: "absolute",
    top: 50,
    left: 10,
    borderWidth: 1,
    borderColor: "#fff",
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
  inputContainer: {
    marginHorizontal: 10,
  },
  input: {
    height: 50,
    borderBottomColor: "#20b2aa",
    borderBottomWidth: 1,
  },
});

export default CreateScreen;
