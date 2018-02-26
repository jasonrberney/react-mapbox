import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { updateMapPoints, toggleEditing } from '../../redux/mapData.jsx'
import { updateMapSource } from '../../redux/mapboxMapInfo.jsx'

class MapAddTripForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            experience: ''
        }
        this._titleChange = this._titleChange.bind(this)
        this._experienceChange = this._experienceChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }

    _titleChange(e) {
        this.setState(Object.assign({}, this.state, {
            title: e.currentTarget.value
        }))
    }

    _experienceChange(e) {
        this.setState(Object.assign({}, this.state, {
            experience: e.currentTarget.value
        }))
    }

    _onSubmit(e) {
        e.preventDefault()

        //this.props.dispatch(updateMapPoints(updatedPoints))
        //this.props.dispatch(updateMapSource(updatedPoints))
        this.props.dispatch(toggleEditing())
    }

    render() {
        return (
            <form onSubmit={this._onSubmit}>
                <input type='text' value={this.state.title} onChange={this._titleChange}/><br />
                <input type='text' value={this.state.experience} onChange={this._experienceChange}/><br />
                <input type='submit' />
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        mapInfo: state.mapboxMapInfo,
        data: state.mapData
    }
}

export default connect(mapStateToProps)(MapAddTripForm)