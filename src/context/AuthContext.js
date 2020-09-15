import { Switch } from "react-native-gesture-handler";
import { createDataContext } from "./createDataContext";
import { app } from "../firebase";

const reducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, isSigned: true };
    case "signout":
      return { ...state, isSigned: false };
    default:
      return state;
  }
};

const onAuthStateChangeOfUser = (dispatch) => {
  app.auth().onAuthStateChanged((user) => {
    if(user) {
      return () => {
        dispatch({ type: "signin" });
      };
    }else{
      return () => {
        dispatch({ type: "signout" });
      };
    }
  });
}

const onSitnin = (dispatch) => {
  return () => {
    dispatch({ type: "signin" });
  };
};

const onSignout = (dispatch) => {
  return () => {
    dispatch({ type: "signout" });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    onSitnin,
    onSignout,
    onAuthStateChangeOfUser
  },
  {
    isSigned: false,
  }
);
