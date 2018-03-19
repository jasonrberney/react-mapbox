const CHANGE_LAT_LNG_ZOOM = 'CHANGE_LAT_LNG_ZOOM';
const SET_MAPBOX_MAP = 'SET_MAPBOX_MAP';
const CHANGE_BASEMAP = 'CHANGE_BASEMAP';
const UPDATE_MAP_SOURCE = 'UPDATE_MAP_SOURCE';
const REMOVE_MAP_SOURCE = 'REMOVE_MAP_SOURCE';
const REMOVE_MAP_LAYER = 'REMOVE_MAP_LAYER';

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

export function updateMapSource (points) {
    return {
        type: UPDATE_MAP_SOURCE,
        points
    }
}

export function removeMapSource(source) {
    return {
        type: REMOVE_MAP_SOURCE,
        source
    }
}

export function removeMapLayer(layer) {
    return {
        type: REMOVE_MAP_LAYER,
        layer
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
            //let newMap = state.mapboxMap
            //let replaceSource = state.mapboxMap.getSource('mapPointsSource');
            //let replaceLayer = state.mapboxMap.getLayer('mapPointsLayer');
            //newMap.setStyle(`mapbox://styles/mapbox/${action.basemap}-v9`);
            state.mapboxMap.setStyle(`mapbox://styles/mapbox/${action.basemap}-v9`);
            
            // newMap.on('load', () => {
            //     newMap.addSource(replaceSource);
            //     newMap.addLayer(replaceLayer);
            // })

            return Object.assign({}, state, {
                basemap: action.basemap
            })
        case UPDATE_MAP_SOURCE:
            debugger;
            state.mapboxMap.getSource('mapPointsSource').setData({
                type: "FeatureCollection",
                features: action.points
            })
        case REMOVE_MAP_LAYER:
            state.mapboxMap.removeLayer(action.layer)
        case REMOVE_MAP_SOURCE:
            state.mapboxMap.removeSource(action.source)
        default:
            return state
    }
}