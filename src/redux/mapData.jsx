const ADD_MAP_DATA = 'ADD_MAP_DATA';
//const ADD_USER_MAP_DATA = 'ADD_USER_MAP_DATA';
const ADD_NEW_MAP_POINT = 'ADD_NEW_MAP_POINT';
const UPDATE_MAP_POINTS = 'UPDATE_MAP_POINTS';
const TOGGLE_EDITING = 'TOGGLE_EDITING';

const initialMapDataState = {
    mapboxDataFeatures: [],
    mapboxNewPoint: [],
    isEditing: false,
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
                mapboxNewPoint: action.newPoint
            })
        case UPDATE_MAP_POINTS:            
            return Object.assign({}, state, {
                mapboxDataFeatures: action.points,
                lastMapPointUpdate: new Date()
            })
        case TOGGLE_EDITING:
            return Object.assign({}, state, {
                isEditing: true
            })
        default: 
            return state             
    }
} 