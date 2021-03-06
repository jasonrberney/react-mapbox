import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleEdit from '../ToggleEdit/ToggleEdit.jsx'
import MapTripForm from '../MapTripForm/MapTripForm.jsx'
import MapAddTripForm from '../MapTripForm/MapAddTripForm.jsx'
import { flyHere } from './styles.css'

class MapJournalPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this._onClick = this._onClick.bind(this)
    }

    _onClick() {
        if(this.props.feature !== null) {
            this.props.mapInfo.mapboxMap.flyTo({
                center: this.props.feature.geometry.coordinates.slice(),
                zoom: 9,
                speed: 0.6,
            })
        }
        else if (this.props.coordinates !== null) {
            this.props.mapInfo.mapboxMap.flyTo({
                center: this.props.coordinates.slice(),
                zoom: 9,
                speed: 0.6,
            })
        }
    }

    render() { 
        let pointIndex = null;

        if (this.props.feature !== null) {
            for(let i = 0; i < this.props.data.mapboxDataFeatures.length; i++) {
                if (this.props.data.mapboxDataFeatures[i].id === this.props.feature.id) {
                    pointIndex = i;
                }
            }
        }
        else if (this.props.feature === null) {
            for(let i = 0; i < this.props.data.mapboxDataFeatures.length; i++) {
                if (this.props.data.mapboxDataFeatures[i].id === this.props.data.mapboxNewPoint[0].id) {
                    pointIndex = i;
                }
            }
        }

        return (
            <div>
                {this.props.data.isEditing 
                    ? 
                        <div>
                            {this.props.data.isAdding 
                                ? 
                                <div>
                                    <MapAddTripForm />
                                </div>
                                : 
                                <div>
                                    <MapTripForm feature={this.props.feature}/>
                                </div>
                            }
                        </div>
                    : 
                        <div>
                            <h2>{this.props.data.mapboxDataFeatures[pointIndex].properties.title}</h2>
                            <p>{this.props.data.mapboxDataFeatures[pointIndex].properties.experience}</p>
                            <button className={flyHere} onClick={this._onClick}>{'Fly Here'}</button>
                            <ToggleEdit />
                        </div>
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

export default connect(mapStateToProps)(MapJournalPopup);

// TWO OTHER POTENTIAL WAYS TO CREATE POPUP
// USE FUNCTION TO CREATE HTML:
// export function myPopup(feature) {
//     let html = '';
//     html += "<h2>" + feature.properties.title + "</h2>";
//     html += "<p>" + feature.properties.experience + "</p>";
//     html += `<button class='content' id='btn-collectobj' onClick='${_onClick}' value='Collect'>Collect</button>`;
//     html += `${<MapJournalPopup />}`;
//     html += "</div>";
//     return html;
// }
// USE REACT-MAPBOX-GL TO CREATE POPUP:
// <Popup
//     coordinates={[0,0]}
//     anchor="bottom"
//     offset={1}
// >
//     <div>
//         {'ello'}
//     </div>
//     <div className={css(styles.container)}>
//     <img className={css(styles.image)} src={monument.image_url}/>
//     <div className={css(styles.footer)}>
//         <h1 style={{ fontSize: 15 }}>{ monument.site }</h1>
//     </div>
//     </div>
// </Popup>