const CHANGE_LAT_LNG_ZOOM = 'CHANGE_LAT_LNG_ZOOM';
const SET_MAPBOX_MAP = 'SET_MAPBOX_MAP';

const initialMapState = {
    map: null,
    lng: 5, 
    lat: 34,
    zoom: 1.5,
    basemap: 'streets'
}

export function setMapboxMap (mapboxMap) {
    return {
        type: SET_MAPBOX_MAP,
        mapboxMap
    }
}

export function changeLatLngZoom (lat, lng, zoom) {
    return {
        type: CHANGE_LAT_LNG_ZOOM,
        lat,
        lng,
        zoom
    }
}

export default function mapboxMap (state = initialMapState, action) {
    switch(action.type) {
        case SET_MAPBOX_MAP:
            return Object.assign({}, state, {
                map: action.map
            })
        case CHANGE_LAT_LNG_ZOOM:
            return Object.assign({}, state, {
                lat: action.lat,
                lng: action.lng,
                zoom: action.zoom,
            })
        default:
            return state
    }
}