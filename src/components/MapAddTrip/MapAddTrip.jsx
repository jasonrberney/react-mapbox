import React, { Component } from 'react'

class MapAddTrip extends Component {
    constructor(props) {
        super (props)
    }

    render() {
        return (
            <button onClick={this._onClick}>
                {'Add A Trip'}
            </button>
        )
    }
}

export default MapAddTrip