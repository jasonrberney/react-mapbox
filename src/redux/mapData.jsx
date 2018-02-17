const ADD_MAP_DATA = 'ADD_MAP_DATA';
//const ADD_USER_MAP_DATA = 'ADD_USER_MAP_DATA';

const initialMapDataState = {
    mapboxDataFeatures: []
}

export function addDefaultMapData(mapPointData) {
    return {
        type: ADD_MAP_DATA,
        mapPointData
    }
}

export default function mapData (state = initialMapDataState, action) {
    switch(action.type) {
        case ADD_MAP_DATA:
            return Object.assign({}, state, {
                mapboxDataFeatures: action.mapPointData 
            })
        default: 
            return state             
    }
} 