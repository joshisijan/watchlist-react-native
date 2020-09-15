import * as firebase from "firebase";
import * as GoogleSignIn from "expo-google-sign-in";

const firebaseConfig = {
  apiKey: "AIzaSyAhGAyZ2o6bOVpHYySEOFRiCYe0OIITfNo",
  authDomain: "watchlist-c3ead.firebaseapp.com",
  databaseURL: "https://watchlist-c3ead.firebaseio.com",
  projectId: "watchlist-c3ead",
  storageBucket: "watchlist-c3ead.appspot.com",
  messagingSenderId: "34326015795",
  appId: "1:34326015795:web:f56c0a84d457c641bc5846",
  measurementId: "G-SR67CMW8RB",
};

export const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const signInWithEmailAndPassword = async () => {
  app.auth().signInWithEmailAndPassword('asd@asd.com', 'asd12345')
  .then((user) => {
    console.log(user);
  })
  .catch((err) => console.log(err.message));
}

const signInWithGoogleAccount = async () => {
  try {
    console.log('aa')
    await GoogleSignIn.initAsync({
      clientId: '34326015795-3griqf588oeibjfqio6ajpd44g42jl8e.apps.googleusercontent.com',
    });
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    if(type === 'success'){
      const user = await GoogleSignIn.signInSilentlyAsync();
    }
  } catch (err) {
    console.log(err.message);
  }
};
