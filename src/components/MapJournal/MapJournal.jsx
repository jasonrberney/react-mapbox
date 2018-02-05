import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { container, latlng } from './styles.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZDZsejMwNTF2OGIyd3FybXgycWZjajMifQ.SHNdahZGOVsIMFyGEoUIPw'

class MapJournal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5, 
            lat: 34,
            zoom: 1.5
        }
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
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
    }
    render () {
        const { lng, lat, zoom } = this.state;

        const style = {
            position: 'absolute',
            top: '15%',
            bottom: '1.5%',
            width: '99%'
        };

        return (
            <div className='container'>
                <div className='latlng'>
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div ref={el => this.mapContainer = el} style={style}>
                </div>
            </div>
        )
    }
}

export default MapJournal