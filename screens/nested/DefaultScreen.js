import { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const DefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 250, height: 250 }}
            />
            <View>
              <Text>{item.comment}</Text>
            </View>

            <View>
              <Button
                style={{ color: "#000" }}
                title="Go to Map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="Go to Comments"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default DefaultScreen;
