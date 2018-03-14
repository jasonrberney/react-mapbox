import React, { Component } from 'react'
import MapJournal from '../../components/MapJournal/MapJournal.jsx'
import { connect } from 'react-redux'
import {setTravelData} from '../../redux/mapData.jsx'

class MapContainer extends Component {
    componentDidMount () {

        if (this.props.appUsers.authedId) {
            const uid = this.props.appUsers.authedId
        }

        //this.props.dispatch(setTravelData())
        //const currentTravel = listenToTravel(uid)
        //debugger;

    }

    render () {
        return (
            <MapJournal userData={this.props.data} loggedIn = {this.props.appUsers.authedId ? this.props.appUsers.authedId : null}
            />
        )
    }
}

function mapStateToProps (state) {
    return {
        appUsers: state.appUsers,
        data: state.mapData.mapboxDataFeatures
    }
}

export default connect(mapStateToProps)(MapContainer)