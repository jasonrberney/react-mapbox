const CHANGE_LAT_LNG_ZOOM = 'CHANGE_LAT_LNG_ZOOM';
const SET_MAPBOX_MAP = 'SET_MAPBOX_MAP';
const CHANGE_BASEMAP = 'CHANGE_BASEMAP';

const initialMapState = {
    mapboxMap: null,
    lng: 5, 
    lat: 34,
    zoom: 1.5,
    basemap: 'streets',
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

export function changeBasemap (basemap) {
    return {
        type: CHANGE_BASEMAP,
        basemap
    }
}

export default function mapboxMapInfo (state = initialMapState, action) {
    switch(action.type) {
        case SET_MAPBOX_MAP:
            return Object.assign({}, state, {
                mapboxMap: action.mapboxMap
            })
        case CHANGE_LAT_LNG_ZOOM:
            return Object.assign({}, state, {
                lat: action.lat,
                lng: action.lng,
                zoom: action.zoom,
            })
        case CHANGE_BASEMAP:

            let newMap = state.mapboxMap
            newMap.setStyle(`mapbox://styles/mapbox/${action.basemap}-v9`);

            return Object.assign({}, state, {
                mapboxMap: newMap,
                basemap: action.basemap
            })
        default:
            return state
    }
}