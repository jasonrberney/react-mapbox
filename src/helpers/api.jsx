import { ref } from '../config/constants.jsx'

function saveToTravel (travel) {
    const travelId = ref.child('travel').push().key
    const travelPromise = ref.child(`travel/${travelId}`).set({...travel, travelId})

    return {
        travelId,
        travelPromise
    }
}

function saveToUsersTravel (travel, travelId, uid) {
    return ref.child(`usersTravel/${uid}/${travelId}`)
        .set({...travel, travelId})
}

export function saveTravel (travel, uid) {
    const { travelId, travelPromise } = saveToTravel(travel)

    return Promise.all([
        travelPromise,
        saveToUsersTravel(travel, travelId, uid)
    ]).then(() => ({...travel, travelId}))
}