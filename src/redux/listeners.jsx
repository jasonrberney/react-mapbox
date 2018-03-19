const ADD_LISTENER = 'ADD_LISTENER'
const REMOVE_LISTENER = 'REMOVE_LISTENER'

export function addListener (listenerId) {
    return {
        type: ADD_LISTENER,
        listenerId
    }
}

export function removeListener (listenerId) {
    return {
        type: REMOVE_LISTENER,
        listenerId
    }
}

export default function listeners (state = {}, action) {
    switch (action.type) {
      case ADD_LISTENER :
        return {
          ...state,
          [action.listenerId]: true,
        }
      case REMOVE_LISTENER :
        return {
          ...state,
          [action.listenerId]: false,
        }
      default :
        return state
    }
}
  