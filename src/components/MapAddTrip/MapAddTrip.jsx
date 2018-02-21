import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { addNewMapPoint } from '../../redux/mapData.jsx'

class MapAddTrip extends Component {
    constructor(props) {
        super (props)

        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        let newPoint = [{
            type: "Feature",
            geometry: {
                "type": "Point",
                "coordinates": [this.props.mapInfo.lng, this.props.mapInfo.lat]
            }
        }];

        this.props.dispatch(addNewMapPoint(newPoint))

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