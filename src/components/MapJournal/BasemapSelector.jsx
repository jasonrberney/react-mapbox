import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { changeBasemap } from '../../redux/mapboxMapInfo.jsx'
import { basemapContainer } from './styles.css'

class BasemapSelector extends Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    _onChange (e) {
        this.props.dispatch(changeBasemap(e.currentTarget.name))

    }

    render () {
        return (
            <div className={basemapContainer}>
                <ul>
                    <li>
                        <input type="radio" name="streets" checked={'streets' === this.props.mapInfo.basemap} onChange={this._onChange} />
                        <label>streets</label>
                    </li>
                    <li>
                        <input type="radio" name="dark" checked={'dark' === this.props.mapInfo.basemap} onChange={this._onChange} />
                        <label>dark</label>
                    </li>
                    <li>
                        <input type="radio" name="satellite" checked={'satellite' === this.props.mapInfo.basemap} onChange={this._onChange} />
                        <label>satellite</label>
                    </li>
                    <li>
                        <input type="radio" name="light" checked={'light' === this.props.mapInfo.basemap} onChange={this._onChange} />
                        <label>light</label>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        mapInfo: state.mapboxMapInfo
    }
}

export default connect(mapStateToProps)(BasemapSelector)