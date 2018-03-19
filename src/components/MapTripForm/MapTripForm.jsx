import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { updateMapPoints, toggleEditing } from '../../redux/mapData.jsx'
import { updateMapSource } from '../../redux/mapboxMapInfo.jsx'

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
        debugger;
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

        this.props.dispatch(updateMapPoints(updatedPoints))
        this.props.dispatch(updateMapSource(updatedPoints))
        console.log("Toggle Off")
        this.props.dispatch(toggleEditing(false))

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

export default connect(mapStateToProps)(MapTripForm)