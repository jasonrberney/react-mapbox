import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { dispatch } from 'redux'
import { store } from '../../index.js'
import MapJournalPopup from '../MapJournal/MapJournalPopup.jsx'
import { addNewMapPoint, toggleEditing, mapPopup, removeMapPopup } from '../../redux/mapData.jsx'
import { addTrip, addTripDisabled } from './styles.css'

class MapAddTrip extends Component {
    constructor(props) {
        super (props)

        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        console.log("Toggle On")
        this.props.dispatch(toggleEditing(true))
        
        // remove popup from map
        if (this.props.data.popup !== null) {
            this.props.dispatch(removeMapPopup());
            this.props.data.popup.remove();
        }

        let newPointId = 0;
        for(let i = 0; i < this.props.data.mapboxDataFeatures.length; i++) {
            if (this.props.data.mapboxDataFeatures[i].id >= newPointId) {
                newPointId = i + 1;
                continue;
            }
            else {
                newPointId = i;
            }
        }

        let newPoint = [{
            id: newPointId,
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

        let popup = new mapboxgl.Popup({closeOnClick:false})
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
            <div>
                {this.props.data.isAdding
                ?
                    <button 
                        className={addTripDisabled} 
                        onClick={this._onClick}
                        disabled={true}>
                        {'Submit your Adventure'}
                    </button>
                :
                    <button 
                        className={addTrip} 
                        onClick={this._onClick}
                        disabled={false}>
                        {'Add an Adventure'}
                    </button>
                }
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

export default connect(mapStateToProps)(MapAddTrip);