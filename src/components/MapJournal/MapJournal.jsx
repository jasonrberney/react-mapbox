import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { container, latlng } from './styles.css'
import { stringify } from 'querystring';
import BasemapSelector from './BasemapSelector.jsx'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZDZsejMwNTF2OGIyd3FybXgycWZjajMifQ.SHNdahZGOVsIMFyGEoUIPw'

class MapJournal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5, 
            lat: 34,
            zoom: 1.5,
            basemap: 'streets'
        }
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: `mapbox://styles/mapbox/${this.state.basemap}-v9`,
            center: [lng, lat],
            zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            })
        })

        map.on('click', (e) => {

            this.setState({
                lng: e.lngLat.lng,
                lat: e.lngLat.lat,
            })

            console.log(`clicked ${this.state.lng}, ${this.state.lat}`)
        })

        map.on('dblclick', () => {
            console.log('dblClicked')
        })
    }
    
    render () {
        const { lng, lat, zoom } = this.state;

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
                        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div>
                    <BasemapSelector basemap={this.state.basemap}/>
                </div>
            </div>
        )
    }
}

export default MapJournal