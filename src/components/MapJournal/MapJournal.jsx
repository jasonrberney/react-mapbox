import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { container, latlng } from './styles.css'
import { stringify } from 'querystring';
import BasemapSelector from './BasemapSelector.jsx'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import DefaultData from '../../helpers/DefaultData.jsx'
import { setMapboxMap, changeLatLngZoom } from '../../redux/mapboxMapInfo.jsx'
import { addDefaultMapData } from '../../redux/mapData.jsx'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZDZsejMwNTF2OGIyd3FybXgycWZjajMifQ.SHNdahZGOVsIMFyGEoUIPw'

class MapJournal extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { lng, lat, zoom } = this.props.mapInfo;
        let loggedIn = true;

        const mapboxMap = new mapboxgl.Map({
            container: this.mapContainer,
            style: `mapbox://styles/mapbox/${this.props.mapInfo.basemap}-v8`,
            center: [lng, lat],
            zoom
        });

        mapboxMap.on('load', () => {
            let initialMapData = loggedIn === true ? DefaultData : UserData

            this.props.dispatch(addDefaultMapData(initialMapData))
 
            mapboxMap.addSource('mapPointsSource', {
                type: "geojson", 
                data: {
                    type: "FeatureCollection",
                    features: this.props.data.mapboxDataFeatures
                }
            });
            mapboxMap.addLayer(
                {
                    id: "mapPointsLayer", 
                    type: "symbol", 
                    source: "mapPointsSource", 
                    layout: {
                        "icon-image": "{marker-symbol}", 
                        "text-field": "{title}", 
                        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"], 
                        "text-offset": [0, 0.6], 
                        "text-anchor": "top"
                    }
                }
            );
        });

        this.props.dispatch(setMapboxMap(mapboxMap))

        mapboxMap.on('move', () => {
            const { lng, lat } = mapboxMap.getCenter();

            let long = lng.toFixed(4)
            let lati = lat.toFixed(4)
            let zoom = mapboxMap.getZoom().toFixed(2)

            this.props.dispatch(changeLatLngZoom(lati, long, zoom))
        })

        mapboxMap.on('click', 'mapPointsLayer', (e) => {
            // When a click event occurs on a feature in the mapPointsLayer layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            let coordinates = e.features[0].geometry.coordinates.slice();
            let description = e.features[0].properties.title;

            // Ensure that if the map is zoomed out such that multiple copies of the feature are visible,
            // the popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(this.props.mapInfo.mapboxMap)

            //console.log(`clicked ${this.props.mapInfo.lng}, ${this.props.mapInfo.lat}`)
        })

        mapboxMap.on('dblclick', () => {
            console.log('dblClicked')
        })

    }
    
    render () {
        const style = {
            position: 'absolute',
            top: '15%',
            bottom: '1.5%',
            width: '99%',
        };

        return (
            <div className='container'>
                <div ref={el => this.mapContainer = el} style={style}>
                    <div className='latlng'>
                        <div>{`Longitude: ${this.props.mapInfo.lng} Latitude: ${this.props.mapInfo.lat} Zoom: ${this.props.mapInfo.zoom}`}</div>
                    </div>
                    <BasemapSelector />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        mapInfo: state.mapboxMapInfo,
        data: state.mapData
    }
}

export default connect(mapStateToProps)(MapJournal);