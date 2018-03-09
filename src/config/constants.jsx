import firebase from 'firebase'

// Initialize Firebase
const config = {

};

firebase.initializeApp(config);

// This ref has a bunch of firebase properties on it that can be used to access the firebase database
export const ref = firebase.database().ref()
// This is a reference to firebase authentication
export const firebaseAuth = firebase.auth
