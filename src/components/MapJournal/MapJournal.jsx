import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { container, latlng } from './styles.css'
import { stringify } from 'querystring';
import BasemapSelector from './BasemapSelector.jsx'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { setMapboxMap, changeLatLngZoom } from '../../redux/mapJournal.jsx'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZDZsejMwNTF2OGIyd3FybXgycWZjajMifQ.SHNdahZGOVsIMFyGEoUIPw'

class MapJournal extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     map: null,
        //     lng: 5, 
        //     lat: 34,
        //     zoom: 1.5,
        //     basemap: 'streets'
        // }

        //this._changeBasemap = this._changeBasemap.bind(this);
    }

    componentDidMount() {
        //const { lng, lat, zoom } = this.state;
        const { lng, lat, zoom } = this.props.data;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: `mapbox://styles/mapbox/${this.props.data.basemap}-v9`,
            center: [lng, lat],
            zoom
        });

        this.props.dispatch(setMapboxMap(map))
        //this.setState({map: map})

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            let long = lng.toFixed(4)
            let lati = lat.toFixed(4)
            let zoom = map.getZoom().toFixed(2)
            // this.setState({
            //     lng: lng.toFixed(4),
            //     lat: lat.toFixed(4),
            //     zoom: map.getZoom().toFixed(2)
            // })
            this.props.dispatch(changeLatLngZoom(lati, long, zoom))
        })

        map.on('click', (e) => {

            // this.setState({
            //     lng: e.lngLat.lng,
            //     lat: e.lngLat.lat,
            // })

            console.log(`clicked ${this.props.data.lng}, ${this.props.data.lat}`)
        })

        map.on('dblclick', () => {
            console.log('dblClicked')
        })
    }

    _changeBasemap(basemapValue) {
        data.map.setStyle(`mapbox://styles/mapbox/${basemapValue}-v9`);
        //this.setState({basemap: basemapValue})
    }
    
    render () {
        const { lng, lat, zoom } = this.props.data;

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
                    <BasemapSelector basemap={this.props.data.basemap} changeBasemap={this._changeBasemap}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(MapJournal);