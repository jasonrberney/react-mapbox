import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { updateWithNewPoint, toggleEditing, submitNewPoint, mapPointFanout } from '../../redux/mapData.jsx'
import { updateMapSource, removeMapSource, removeMapLayer } from '../../redux/mapboxMapInfo.jsx'
import { submitTravel, expTextAreaContainer, expTextArea, titleTextArea } from './styles.css'

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

        this.props.dispatch(submitNewPoint(this.state.title, this.state.experience))

        let newMapboxDataFeatures = this.props.data.mapboxDataFeatures.map((feature) => {
            return feature
        })
        newMapboxDataFeatures.push(this.props.data.mapboxNewPoint[0])
        this.props.dispatch(mapPointFanout(newMapboxDataFeatures))
        // BELOW was replaced with thunk to push to firebase
        // this.props.dispatch(updateWithNewPoint(newMapboxDataFeatures))
        // //debugger;
        // this.props.dispatch(removeMapLayer('newPointLayer'))
        // this.props.dispatch(updateMapSource(newMapboxDataFeatures))
        // this.props.dispatch(toggleEditing())
        console.log(this.props)
    }

    render() {
        return (
            <form className={expTextAreaContainer} onSubmit={this._onSubmit}>
                <input className={titleTextArea} type='text' placeholder="Enter a location..." value={this.state.title} onChange={this._titleChange}/><br />
                <textarea className={expTextArea} type='text' placeholder="Enter an unforgettable experience..." maxLength ={250} value={this.state.experience} onChange={this._experienceChange}/><br />
                <input className={submitTravel} type='submit' />
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