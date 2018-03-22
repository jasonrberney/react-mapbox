import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { updateMapPoints, toggleEditing, mapPointFanout } from '../../redux/mapData.jsx'
import { updateMapSource } from '../../redux/mapboxMapInfo.jsx'
import { submitTravel, expTextAreaContainer, expTextArea, titleTextArea } from './styles.css'

class MapTripForm extends Component {
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

    componentDidMount() {
        if (this.props.feature) {
            this.setState({
                title: this.props.feature.properties.title, 
                experience: this.props.feature.properties.experience
            })
        }
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
        
        let updatedPoints = this.props.data.mapboxDataFeatures.map((point) => {
            if (point.id === this.props.feature.id) {
                point.properties.title = this.state.title
                point.properties.experience = this.state.experience
            }
            return point
        })

        this.props.dispatch(mapPointFanout(updatedPoints))
        // this.props.dispatch(updateMapPoints(updatedPoints))
        // this.props.dispatch(updateMapSource(updatedPoints))
        // console.log("Toggle Off")
        // this.props.dispatch(toggleEditing(false))

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

export default connect(mapStateToProps)(MapTripForm)