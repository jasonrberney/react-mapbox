import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { toggleEditing } from '../../redux/mapData.jsx'

class ToggleEdit extends Component {
    constructor(props){
        super(props)

        this._onClick = this._onClick.bind(this)
    }

    _onClick() {
        this.props.dispatch(toggleEditing)
    }

    render() {
        return (
            <button onClick={this._onClick}>{'Edit'}</button>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.mapData,
    }
}

export default connect(mapStateToProps)(ToggleEdit)