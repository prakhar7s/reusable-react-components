import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCVN8VPHmsmUsFA4fsuxQ5DO2PSLiJjFGg",
  authDomain: "simple-todo-project-22a5f.firebaseapp.com",
  projectId: "simple-todo-project-22a5f",
  storageBucket: "simple-todo-project-22a5f.appspot.com",
  messagingSenderId: "789242465295",
  appId: "1:789242465295:web:575aa5be162a953a19277a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "it";

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

firebase.auth().useDeviceLanguage();
export default firebase;
