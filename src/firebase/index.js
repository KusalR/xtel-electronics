import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC74vuQjJwe9PpPJMgMMC765g5jjqkn0OQ",
    authDomain: "af-exam.firebaseapp.com",
    projectId: "af-exam",
    storageBucket: "af-exam.appspot.com",
    messagingSenderId: "701630912495",
    appId: "1:701630912495:web:724da38dc2f1903898c81a",
    measurementId: "G-4WDXY91P0S"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
