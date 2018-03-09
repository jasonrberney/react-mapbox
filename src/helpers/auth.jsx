import firebase from 'firebase'
import { ref, firebaseAuth } from '../config/constants.jsx'

export default function auth () {
    return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())

    // BELOW is exampleof Promise to test auth
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve({
    //             name: 'Jason Berney',
    //             uid: 'jasonrberney',
    //         })
    //     }, 2000)
    // })
}

export function checkIfAuthed (store) {
    return store.getState().appUsers.isAuthed
}

export function logout () {
    return firebaseAuth().signOut()
}

export function saveUser (user) {
    // ref is database reference, .child is users within database
    return ref.child(`users/${user.uid}`)
        // sets user to the database location
        .set(user)
        .then(() => user)
}