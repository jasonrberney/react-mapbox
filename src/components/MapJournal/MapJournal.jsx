import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import { container, latlng } from './styles.css'
import { stringify } from 'querystring';
import BasemapSelector from './BasemapSelector.jsx'
import MapJournalPopup from './MapJournalPopup.jsx'
import { Popup } from 'react-mapbox-gl'
import { connect, Provider } from 'react-redux'
import { dispatch } from 'redux'
import DefaultData from '../../helpers/DefaultData.jsx'
import { setMapboxMap, changeLatLngZoom } from '../../redux/mapboxMapInfo.jsx'
import { addDefaultMapData } from '../../redux/mapData.jsx'
import { store } from '../../index.js'

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
            if (isDragging) return;

            const { lng, lat } = mapboxMap.getCenter();

            let long = lng.toFixed(4)
            let lati = lat.toFixed(4)
            let zoom = mapboxMap.getZoom().toFixed(2)

            this.props.dispatch(changeLatLngZoom(lati, long, zoom))
        })

        mapboxMap.on('click', 'mapPointsLayer', (e) => {
            // When a click event occurs on a feature in the mapPointsLayer layer, open a popup at the location
            let coordinates = e.features[0].geometry.coordinates.slice();         

            // Ensure that if the map is zoomed out such that multiple copies of the feature are visible,
            // the popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                //.setHTML(`<div><strong>${title}</strong><p>${experience}</p></div>`)
                .setHTML(`<div id='popup'></div>`)
                //.setHTML(`${<MapJournalPopup />}`)
                //.setHTML(myPopup(e.features[0]))
                .addTo(this.props.mapInfo.mapboxMap)
                .isOpen(ReactDOM.render(<Provider store={store}>
                                            <MapJournalPopup feature={e.features[0]}/>
                                        </Provider>, 
                                        document.getElementById('popup')))

            // setTimeout(() => {
            //     ReactDOM.render(<MapJournalPopup />, document.getElementById('popup'))
            // }, 500)
        })

        // Change the cursor to a pointer when the mouse is over the places layer.
        mapboxMap.on('mouseenter', 'mapPointsLayer', () => {
            isCursorOverPoint = true;
            mapboxMap.getCanvas().style.cursor = 'pointer';
        });
        // Change it back to a pointer when it leaves.
        mapboxMap.on('mouseleave', 'mapPointsLayer', () => {
            isCursorOverPoint = false;
            mapboxMap.getCanvas().style.cursor = '';
        });

        // Change the cursor to a pointer when the mouse is over the new point layer.
        mapboxMap.on('mouseenter', 'newPointLayer', () => {
            mapboxMap.setPaintProperty('newPointLayer', 'circle-color', '#3bb2d0');
            isCursorOverPoint = true;
            mapboxMap.getCanvas().style.cursor = 'move';
            mapboxMap.dragPan.disable();
        });
        // Change it back to a pointer when it leaves.
        mapboxMap.on('mouseleave', 'newPointLayer', () => {
            mapboxMap.setPaintProperty('newPointLayer', 'circle-color', '#3887be');
            isCursorOverPoint = false;
            mapboxMap.getCanvas().style.cursor = '';
            mapboxMap.dragPan.enable();
        });

        mapboxMap.on('dblclick', () => {
            console.log('dblClicked')
        })

        // ADDING NEW POINT
        // Holds mousedown state for events. if this flag is active, we move the point on `mousemove`.
        let isDragging = false
        
        // Is the cursor over a point? if this flag is active, we listen for a mousedown event.
        let isCursorOverPoint = false;

        let canvas = mapboxMap.getCanvasContainer();

        mapboxMap.on('mousedown', (e) => {
            //debugger;

            if (!isCursorOverPoint) return;
            
            isDragging = true;

            //debugger;
            // Set a cursor indicator
            canvas.style.cursor = 'grab';
            //map.on('mousemove', onmoving);
            //map.once('mouseup', onUp);
            //mapboxMap.on('mousemove', this.onMove(e, isDragging));
            //mapboxMap.once('mouseup', this.onUp(e, isDragging));
        })

        //function onMove(e) {
        mapboxMap.on('mousemove', (e) => {
            //debugger;
            if (!isDragging) return;
            var coords = e.lngLat;
        
            // Set a UI indicator for dragging.
            canvas.style.cursor = 'grabbing';
        
            // Update the Point feature in `geojson` coordinates
            // and call setData to the source layer `point` on it.
            let moveMapPoint = this.props.data.mapboxNewPoint;
            moveMapPoint[0].geometry.coordinates = [coords.lng, coords.lat];

            mapboxMap.getSource('newPointSource').setData(moveMapPoint[0]);
        })
        
        mapboxMap.on('mouseup', (e) => {
            if (!isDragging) return;
            //debugger;
            var coords = e.lngLat;
        
            console.log(coords)
            canvas.style.cursor = '';
            isDragging = false;
        
            // Unbind mouse events
            mapboxMap.off('mousemove');
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