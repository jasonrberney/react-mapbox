import React, { Component } from 'react'

class BasemapSelector extends Component {
    contructor(props) {
        super(props);
        this.state = {
            props
        }
    }

    render (){
        return (
            <div>
                <ul>
                    <li>
                        <input type="checkbox" name="streets-v9" checked={} onChange={this._onChange} />
                        <label>streets</label>
                    </li>
                    <li>
                        <input type="checkbox" name="dark" checked={} onChange={this._onChange} />
                        <label>streets</label>
                    </li>
                </ul>
            </div>
        )
    }
}

export default BasemapSelector