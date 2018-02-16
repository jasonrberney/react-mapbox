const ADD_MAP_DATA = 'ADD_MAP_DATA';
//const ADD_USER_MAP_DATA = 'ADD_USER_MAP_DATA';

const initialMapDataState = {
    mapboxDataFeatures: []
}

export function addDefaultMapData(mapPoint) {
    return {
        type: ADD_MAP_DATA,
        mapPoint
    }
}

export default function mapData (state = initialMapDataState, action) {
    switch(action.type) {
        case ADD_MAP_DATA:
            return Object.assign({}, state, {
                mapboxDataFeatures: [
                    ...state.mapboxDataFeatures,
                    {
                        "type": "Feature",
                        "properties": {
                            "title": action.mapPoint.properties.title,
                            "marker-symbol": "marker-15"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                action.mapPoint.geometry.coordinates[0],
                                action.mapPoint.geometry.coordinates[1]
                            ]
                        }
                    }
                ]               
            })
        default: 
            return state             
    }
} 