import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleEdit from '../ToggleEdit/ToggleEdit.jsx'
//import { Popup } from 'react-mapbox-gl'


class MapJournalPopup extends Component {
    constructor(props) {
        super(props)

        this._onClick = this._onClick.bind(this)
    }

    _onClick() {
        console.log('hello')
        this.props.mapInfo.mapboxMap.flyTo({
            center: this.props.feature.geometry.coordinates.slice(),
            zoom: 9,
            speed: 0.6,
        })
    }

    render() { 
        console.log(this.props.data.isEditing)
        
        return (
            <div>
                {this.props.data.isEditing 
                    ? 
                        <p>{'Soon to be form'}</p>
                    : 
                        <div>
                            <h2>{this.props.feature.properties.title}</h2>
                            <p>{this.props.feature.properties.experience}</p>
                            <button onClick={this._onClick}>{'Fly Here'}</button>
                            <ToggleEdit />
                        </div>
                }
                {/* <h2>{this.props.feature.properties.title}</h2>
                <p>{this.props.feature.properties.experience}</p>
                <button onClick={this._onClick}>{'Fly Here'}</button> */}
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