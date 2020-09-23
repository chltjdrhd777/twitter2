import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApFW4Z-4pPRAx9IrD2vyPgTbKFIHdBL9c",
  authDomain: "twitter2-9785f.firebaseapp.com",
  databaseURL: "https://twitter2-9785f.firebaseio.com",
  projectId: "twitter2-9785f",
  storageBucket: "twitter2-9785f.appspot.com",
  messagingSenderId: "35157338836",
  appId: "1:35157338836:web:05495de7fde4a59c9ce941",
  measurementId: "G-Q8MT590XJB",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
