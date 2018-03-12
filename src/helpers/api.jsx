import { ref } from '../config/constants.jsx'

function saveToTravel (travel) {
    const travelId = ref.child('travel').push().key
    const travelPromise = ref.child(`travel/${travelId}`).set({...travel, travelId})

    return {
        travelId,
        travelPromise
    }
}

function saveToUsersTravel (travel, travelId) {
    return ref.child(`usersTravel/${travel.uid}/${travelId}`)
        .set({...travel, travelId})
}

export function saveTravel (travel) {
    const { travelId, travelPromise } = saveToTravel(travel)

    return Promise.all([
        travelPromise,
        saveToUsersTravel(travel, travelId)
    ]).then(() => ({...travel, travelId}))
}