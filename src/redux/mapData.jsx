import { saveTravel, listenToTravel } from '../helpers/api.jsx'
import { removeMapLayer, updateMapSource } from './mapboxMapInfo.jsx'
import { addListener } from './listeners.jsx'

const ADD_MAP_DATA = 'ADD_MAP_DATA';
const UPDATE_MAP_POINTS = 'UPDATE_MAP_POINTS';
const MAP_POPUP = 'MAP_POPUP';
const ADD_NEW_MAP_POINT = 'ADD_NEW_MAP_POINT';
const SUBMIT_NEW_POINT = 'SUBMIT_NEW_POINT';
const UPDATE_WITH_NEW_POINT = 'UPDATE_WITH_NEW_POINT';
const TOGGLE_EDITING = 'TOGGLE_EDITING';
const SETTING_TRAVEL_LISTENER = 'SETTING_TRAVEL_LISTENER'
const SETTING_TRAVEL_LISTENER_ERROR = 'SETTING_TRAVEL_LISTENER_ERROR'
const SETTING_TRAVEL_LISTENER_SUCCESS = 'SETTING_TRAVEL_LISTENER_SUCCESS'

const initialMapDataState = {
    mapboxDataFeatures: [],
    mapboxNewPoint: [],
    isAdding: false,
    isEditing: false,
    isFetching: false,
    popup: null,
    lastMapPointUpdate: null,
}

export function addDefaultMapData(mapPointData) {
    return {
        type: ADD_MAP_DATA,
        mapPointData
    }
}

export function updateMapPoints(points) {
    return {
        type: UPDATE_MAP_POINTS,
        points
    }
}

export function addNewMapPoint(newPoint) {
    return {
        type: ADD_NEW_MAP_POINT,
        newPoint
    }
}

export function submitNewPoint(title, experience) {
    return {
        type: SUBMIT_NEW_POINT,
        title,
        experience
    }
}

export function updateWithNewPoint(points) {
    return {
        type: UPDATE_WITH_NEW_POINT,
        points
    }
}

export function mapPopup(popup) {
    return {
        type: MAP_POPUP,
        popup
    }
}

export function toggleEditing() {
    return {
        type: TOGGLE_EDITING
    }
}

function settingTravelListener () {
    return {
      type: SETTING_TRAVEL_LISTENER,
    }
}
  
function settingTravelListenerError (error) {
    console.warn(error)
    return {
      type: SETTING_TRAVEL_LISTENER_ERROR,
      error: 'Error fetching feeds.',
    }
}
  
function settingTravelListenerSuccess (duckIds) {
    return {
      type: SETTING_TRAVEL_LISTENER_SUCCESS,
      duckIds,
    }
}

export function mapPointFanout(points) {
    debugger;
    return function (dispatch, getState) {

        const uid = getState().appUsers.authedId

        saveTravel(points, uid)
            .then((travelWithId) => {
                debugger;
                //dispatch(updateWithNewPoint(points))
                dispatch(removeMapLayer('newPointLayer'))
                //dispatch(updateMapSource(points))
                dispatch(toggleEditing())
            })
            .catch((err) => {
                console.warn('Error in mapPointFanout', err)
            })
    }
}

export function setTravelData () {
    debugger;
    let initialFetch = true;
    return function (dispatch, getState) {

        if (getState().listeners.travelData === true) {
            return
        }

        dispatch(addListener('travelData'))
        dispatch(settingTravelListener())

        const uid = getState().appUsers.authedId;

        listenToTravel(uid, ([travel]) => {
            debugger;
            initialFetch === true
                ? dispatch(addDefaultMapData(travel)) 
                : dispatch(updateMapPoints(travel)) 
            initialFetch = false
            dispatch(updateMapSource(travel))
            console.log(getState())
        }, (error) => dispatch(settingTravelListenerError(error)))
    }
}

export default function mapData (state = initialMapDataState, action) {
    switch(action.type) {
        case ADD_MAP_DATA:
            debugger;
            return Object.assign({}, state, {
                mapboxDataFeatures: action.mapPointData,
                lastMapPointUpdate: new Date() 
            })
            debugger;
        case ADD_NEW_MAP_POINT:
            return Object.assign({}, state, {
                mapboxNewPoint: action.newPoint,
                isAdding: true
            })
        case UPDATE_MAP_POINTS:   
            debugger;         
            return Object.assign({}, state, {
                mapboxDataFeatures: action.points,
                lastMapPointUpdate: new Date()
            })
        case SUBMIT_NEW_POINT:
            let point = state.mapboxNewPoint
            point[0].properties.title = action.title
            point[0].properties.experience = action.experience

            return Object.assign({}, state, {
                mapboxNewPoint: point,
                isAdding: false
            })
            // const updatedPoints = state.newPoint.map(point => {
            //     if(point.id === action.id){
            //         return {
            //             ...point, 
            //             ...action.payload
            //         }
            //     }
            //     return point
            // })
            // return updatedPoints
        case UPDATE_WITH_NEW_POINT:  
            debugger;
            return Object.assign({}, state, {
                mapboxDataFeatures: action.points
            })        
            // return {
            //     ...state,
            //     mapboxDataFeatures: [
            //         ...state.mapboxDataFeatures, 
            //         state.newPoint
            //     ],
            //     lastMapPointUpdate: new Date()
            // }
        case MAP_POPUP:
            return Object.assign({}, state, {
                popup: action.popup
            })
        case TOGGLE_EDITING:
            return Object.assign({}, state, {
                isEditing: !state.isEditing
            })
        case SETTING_TRAVEL_LISTENER:
            return {
                ...state,
                isFetching: true,
            }
        case SETTING_TRAVEL_LISTENER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        case SETTING_TRAVEL_LISTENER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: '',
            }
        default: 
            return state             
    }
} 