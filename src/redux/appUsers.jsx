import auth, { saveUser } from '../helpers/auth.jsx'
import logout from '../helpers/auth.jsx'
import { formatUserInfo } from '../helpers/utils.jsx'
import { removeListener } from './listeners.jsx'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

export function authUser (uid) {
    return {
        type: AUTH_USER,
        uid
    }
}

function unauthUser () {
    return {
        type: UNAUTH_USER,
    }
}

function fetchingUser () {
    return {
        type: FETCHING_USER,
    }
}

function fetchingUserFailure (error) {
    return {
        type: FETCHING_USER_FAILURE,
        error: 'Error fetching user',
    }
}

export function fetchingUserSuccess (uid, user, timestamp) {
    return {
        type: FETCHING_USER_SUCCESS,
        uid,
        user,
        timestamp,
    }
}

// Middleware allows us to hook into the point between dispatching an action and the moment it reaches a reducer
// fetchAndHandleAuthedUser is dispatched, and then doing some stuff before going through the reducer
export function fetchAndHandleAuthedUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    // Authenticate with firebase through facebook
    return auth().then(({user, credential}) => { 
        console.log('user', user)
        const userData = user.providerData[0]
        // Format user data returned from facebook login
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
        
    })
    .then(({user}) => saveUser(user))
    .then((user) => dispatch(authUser(user.uid)))
    .then(() => dispatch(removeListener('travelData')))
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export function logoutAndUnauth() {
  return function (dispatch) {
    logout()
    dispatch(unauthUser())
  }
}

export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER
  }
}

const initialUserState = {
    lastUpdated: 0,
    info: {
      name: '',
      uid: '',
      avatar: '',
    },
}
  
function user (state = initialUserState, action) {
    switch (action.type) {
      case FETCHING_USER_SUCCESS :
        return {
          ...state,
          info: action.user,
          lastUpdated: action.timestamp,
        }
      default :
        return state
    }
}
  
const initialState = {
    isFetching: true,
    error: '',
    isAuthed: false,
    authedId: '',
}
  
export default function appUsers (state = initialState, action) {
    switch (action.type) {
      case AUTH_USER :
        return {
          ...state,
          isAuthed: true,
          authedId: action.uid,
        }
      case UNAUTH_USER :
        return {
          ...state,
          isAuthed: false,
          authedId: '',
        }
      case FETCHING_USER:
        return {
          ...state,
          isFetching: true,
        }
      case FETCHING_USER_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.error,
        }
      case FETCHING_USER_SUCCESS:
        return action.user === null
          ? {
            ...state,
            isFetching: false,
            error: '',
          }
          : {
            ...state,
            isFetching: false,
            error: '',
            [action.uid]: user(state[action.uid], action),
          }
      case REMOVE_FETCHING_USER:
          return {
            ...state,
            isFetching: false,
          }
      default :
        return state
    }
}