const ADD_MAP_DATA = 'ADD_MAP_DATA';
//const ADD_USER_MAP_DATA = 'ADD_USER_MAP_DATA';
const ADD_NEW_MAP_POINT = 'ADD_NEW_MAP_POINT';

const initialMapDataState = {
    mapboxDataFeatures: [],
    mapboxNewPoint: []
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

export default function mapData (state = initialMapDataState, action) {
    switch(action.type) {
        case ADD_MAP_DATA:
            return Object.assign({}, state, {
                mapboxDataFeatures: action.mapPointData 
            })
        case ADD_NEW_MAP_POINT:
            return Object.assign({}, state, {
                mapboxNewPoint: action.newPoint
            })
        default: 
            return state             
    }
} 