export default function auth () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: 'Jason Berney',
                uid: 'jasonrberney',
            })
        }, 2000)
    })
}

export function checkIfAuthed (store) {
    return store.getState().appUsers.isAuthed
}

export function logout () {
    console.log('logged out')
}