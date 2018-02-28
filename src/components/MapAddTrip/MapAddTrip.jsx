import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { dispatch } from 'redux'
import { store } from '../../index.js'
import MapJournalPopup from '../MapJournal/MapJournalPopup.jsx'
import { addNewMapPoint, toggleEditing, mapPopup } from '../../redux/mapData.jsx'

class MapAddTrip extends Component {
    constructor(props) {
        super (props)

        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        this.props.dispatch(toggleEditing())

        let newPoint = [{
            id: 4,
            type: "Feature",
            properties: {
                title: '',
                experience: '',
                'marker-symbol': 'marker-15'
            },
            geometry: {
                "type": "Point",
                "coordinates": [this.props.mapInfo.lng, this.props.mapInfo.lat]
            }
        }];

        this.props.dispatch(addNewMapPoint(newPoint))

        let popup = new mapboxgl.Popup()
            .setLngLat(newPoint[0].geometry.coordinates)
            .setHTML(`<div id='popup'></div>`)
            .addTo(this.props.mapInfo.mapboxMap)

        this.props.dispatch(mapPopup(popup));

        ReactDOM.render(<Provider store={store}>
                <MapJournalPopup feature={null} coordinates={newPoint[0].geometry.coordinates}/>
            </Provider>, 
            document.getElementById('popup'))                                

        // Add a single point to the map
        this.props.mapInfo.mapboxMap.addSource('newPointSource', {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: newPoint
            }
        });

        this.props.mapInfo.mapboxMap.addLayer({
            id: "newPointLayer",
            type: "circle",
            source: "newPointSource",
            paint: {
                "circle-radius": 10,
                "circle-color": "#3887be"
            }
        });

    }

    render() {
        return (
            <button onClick={this._onClick}>
                {'Add A Trip'}
            </button>
        )
    }
}

function mapStateToProps(state) {
    return {
        mapInfo: state.mapboxMapInfo,
        data: state.mapData
    }
}

export default connect(mapStateToProps)(MapAddTrip);