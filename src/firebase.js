import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCvT_ujZUKBODPRnNDR6SWzE7BiW74SbBQ",
  authDomain: "todo-app-cp-f88cd.firebaseapp.com",
  databaseURL: "https://todo-app-cp-f88cd.firebaseio.com",
  projectId: "todo-app-cp-f88cd",
  storageBucket: "todo-app-cp-f88cd.appspot.com",
  messagingSenderId: "315882639745",
  appId: "1:315882639745:web:6b2645037d7eab45dfd880",
  measurementId: "G-DBQY69E0RX",
});

const db = firebaseApp.firestore();

export default db;
