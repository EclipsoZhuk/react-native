import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={style.container}>
      <Text>ProfileScreen</Text>
      <Button
        title="Sing Out"
        onPress={() => {
          dispatch(authSignOutUser());
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
