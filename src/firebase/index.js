import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDKQk5ENyPgVTOyMdI9AQseEoOG7khxXJw",
  authDomain: "reactjs-8c7de.firebaseapp.com",
  databaseURL: "https://reactjs-8c7de.firebaseio.com",
  projectId: "reactjs-8c7de",
  storageBucket: "reactjs-8c7de.appspot.com",
  messagingSenderId: "772135648214",
  appId: "1:772135648214:web:9c04b0aef19a733ad88277",
  measurementId: "G-R0V92KL53B",
  storageBucket: "gs://reactjs-8c7de.appspot.com",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase };
