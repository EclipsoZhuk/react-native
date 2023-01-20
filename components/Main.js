// Core
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { authStateChangedUser } from "../redux/auth/authOperations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangedUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
