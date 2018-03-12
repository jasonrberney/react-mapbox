import firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCVKl4sZD_oHypifOiMXIECtDyChp5-NWM",
    authDomain: "travelyoung-c743b.firebaseapp.com",
    databaseURL: "https://travelyoung-c743b.firebaseio.com",
    projectId: "travelyoung-c743b",
    storageBucket: "travelyoung-c743b.appspot.com",
    messagingSenderId: "1040177657754"
};

firebase.initializeApp(config);

// This ref has a bunch of firebase properties on it that can be used to access the firebase database
export const ref = firebase.database().ref()
// This is a reference to firebase authentication
export const firebaseAuth = firebase.auth
