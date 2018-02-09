import React, { Component } from 'react'
import { basemap } from './styles.css'

class BasemapSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basemap: props.basemap
        }
        debugger;
        this._onChange = this._onChange.bind(this);
    }

    _onChange (e) {
        debugger;
        this.setState({basemap: e.currentTarget.name})
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
                </ul>
            </div>
        )
    }
}

export default BasemapSelector