// Core
import "react-native-gesture-handler";
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Components
import Main from "./components/Main";

const loadApplication = async () => {
  await Font.loadAsync({
    "PD-Regular": require("./assets/fonts/PlayfairDisplay-Regular.ttf"),
  });
};

export default function App() {
  const [iasReady, setIasReady] = useState(false);

  if (!iasReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
