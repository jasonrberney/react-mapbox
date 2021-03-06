import { ref } from '../config/constants.jsx'

function saveToTravel (travel, uid) {
    const travelId = ref.child('travel').push().key
    //const test = ref.child(`usersTravel/${uid}/`)

    const travelPromise = ref.child(`travel/${travelId}`).set({...travel, travelId})

    return {
        travelId,
        travelPromise
    }
}

function saveToUsersTravel (travel, travelId, uid) {
    return ref.child(`usersTravel/${uid}`)
    //return ref.child(`usersTravel/${uid}/${travelId}`)
        .set({...travel})
}

export function saveTravel (travel, uid) {
    const { travelId, travelPromise } = saveToTravel(travel, uid)
    
    return Promise.all([
        travelPromise,
        saveToUsersTravel(travel, travelId, uid)
    ]).then(() => ({...travel, travelId}))
}

export function listenToTravel (uid, cb, errorCB) {
    ref.child(`usersTravel/${uid}`).on('value', (snapshot) => {
        const travel = snapshot.val() || []
        cb([travel])
    }, errorCB)
}