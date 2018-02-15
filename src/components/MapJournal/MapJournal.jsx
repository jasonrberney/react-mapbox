import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { container, latlng } from './styles.css'
import { stringify } from 'querystring';
import BasemapSelector from './BasemapSelector.jsx'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import DefaultData from '../../helpers/DefaultData.jsx'
import { setMapboxMap, changeLatLngZoom } from '../../redux/mapJournal.jsx'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZDZsejMwNTF2OGIyd3FybXgycWZjajMifQ.SHNdahZGOVsIMFyGEoUIPw'

class MapJournal extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { lng, lat, zoom } = this.props.data;

        const mapboxMap = new mapboxgl.Map({
            container: this.mapContainer,
            style: `mapbox://styles/mapbox/${this.props.data.basemap}-v9`,
            center: [lng, lat],
            zoom
        });

        this.props.dispatch(setMapboxMap(mapboxMap))

        mapboxMap.on('move', () => {
            const { lng, lat } = mapboxMap.getCenter();

            let long = lng.toFixed(4)
            let lati = lat.toFixed(4)
            let zoom = mapboxMap.getZoom().toFixed(2)

            this.props.dispatch(changeLatLngZoom(lati, long, zoom))
        })

        mapboxMap.on('click', (e) => {
            console.log(`clicked ${this.props.data.lng}, ${this.props.data.lat}`)
        })

        mapboxMap.on('dblclick', () => {
            console.log('dblClicked')
        })

        mapboxMap.on('load', () => {
            debugger;
            mapboxMap.addLayer({"id": "points", "type": "circle", "source": {"type": "geojson", "data": DefaultData}
            })
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
                        <div>{`Longitude: ${this.props.data.lng} Latitude: ${this.props.data.lat} Zoom: ${this.props.data.zoom}`}</div>
                    </div>
                    <BasemapSelector />
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