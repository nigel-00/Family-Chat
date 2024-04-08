import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9iBZddDXiHw8bOQmLuAwu8JKUHmYHGJg",
    authDomain: "family-chat-application.firebaseapp.com",
    projectId: "family-chat-application",
    storageBucket: "family-chat-application.appspot.com",
    messagingSenderId: "421350596829",
    appId: "1:421350596829:web:a226cde03d5eed20f83b34",
    measurementId: "G-LNV8JMQKYV"
  };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else{
  app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };