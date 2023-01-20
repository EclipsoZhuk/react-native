import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { actionAuth } from "./authSlice";

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: nickname,
      });

      dispatch(
        actionAuth.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
    } catch (error) {
      console.warn("error Sign In", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      console.log("userIN: ", user);
    } catch (error) {
      console.warn("error Sign In", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(actionAuth.authSignOut());
};

export const authStateChangedUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        actionAuth.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
      dispatch(actionAuth.authStateChange({ stateChange: true }));
    }
  });
};
