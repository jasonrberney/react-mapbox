const ADD_MAP_DATA = 'ADD_MAP_DATA';
//const ADD_USER_MAP_DATA = 'ADD_USER_MAP_DATA';
const ADD_NEW_MAP_POINT = 'ADD_NEW_MAP_POINT';
const UPDATE_MAP_POINTS = 'UPDATE_MAP_POINTS';
const MAP_POPUP = 'MAP_POPUP';
const TOGGLE_EDITING = 'TOGGLE_EDITING';

const initialMapDataState = {
    mapboxDataFeatures: [],
    mapboxNewPoint: [],
    isAdding: false,
    isEditing: false,
    popup: null,
    lastMapPointUpdate: null,
}

export function addDefaultMapData(mapPointData) {
    return {
        type: ADD_MAP_DATA,
        mapPointData
    }
}

export function addNewMapPoint(newPoint) {
    return {
        type: ADD_NEW_MAP_POINT,
        newPoint
    }
}

export function updateMapPoints(points) {
    return {
        type: UPDATE_MAP_POINTS,
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

export default function mapData (state = initialMapDataState, action) {
    switch(action.type) {
        case ADD_MAP_DATA:
            return Object.assign({}, state, {
                mapboxDataFeatures: action.mapPointData,
                lastMapPointUpdate: new Date() 
            })
        case ADD_NEW_MAP_POINT:
            return Object.assign({}, state, {
                mapboxNewPoint: action.newPoint,
                isAdding: true
            })
        case UPDATE_MAP_POINTS:            
            return Object.assign({}, state, {
                mapboxDataFeatures: action.points,
                lastMapPointUpdate: new Date()
            })
        case MAP_POPUP:
            return Object.assign({}, state, {
                popup: action.popup
            })
        case TOGGLE_EDITING:
            return Object.assign({}, state, {
                isEditing: !state.isEditing
            })
        default: 
            return state             
    }
} 