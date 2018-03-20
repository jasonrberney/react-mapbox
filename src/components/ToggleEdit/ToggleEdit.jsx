import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { toggleEditing } from '../../redux/mapData.jsx'
import { editToggle } from './styles.css'

class ToggleEdit extends Component {
    constructor(props){
        super(props)

        this._onClick = this._onClick.bind(this)
    }

    _onClick() {
        console.log("Toggle")
        this.props.dispatch(toggleEditing(true))
    }

    render() {
        return (
            <button className={editToggle} onClick={this._onClick}>{'Edit'}</button>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.mapData,
    }
}

export default connect(mapStateToProps)(ToggleEdit)