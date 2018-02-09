import React, { Component } from 'react'
import { basemap } from './styles.css'

class BasemapSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basemap: props.basemap
        }

        this._onChange = this._onChange.bind(this);
    }

    _onChange (e) {
        this.setState({basemap: e.currentTarget.name})
        this.props.changeBasemap(e.currentTarget.name);
    }

    render () {
        return (
            <div className='basemap'>
                <ul>
                    <li>
                        <input type="radio" name="streets" checked={'streets' === this.state.basemap} onChange={this._onChange} />
                        <label>streets</label>
                    </li>
                    <li>
                        <input type="radio" name="dark" checked={'dark' === this.state.basemap} onChange={this._onChange} />
                        <label>dark</label>
                    </li>
                    <li>
                        <input type="radio" name="satellite" checked={'satellite' === this.state.basemap} onChange={this._onChange} />
                        <label>satellite</label>
                    </li>
                    <li>
                        <input type="radio" name="light" checked={'light' === this.state.basemap} onChange={this._onChange} />
                        <label>light</label>
                    </li>
                </ul>
            </div>
        )
    }
}

export default BasemapSelector