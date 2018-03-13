import React, { Component } from 'react'
import MapJournal from '../../components/MapJournal/MapJournal.jsx'
import { connect } from 'react-redux'
import {setTravelData} from '../../redux/mapData.jsx'

class MapContainer extends Component {
    componentDidMount () {
        debugger;
        if (this.props.appUsers.authedId) {
            const uid = this.props.appUsers.authedId
        }

        this.props.dispatch(setTravelData())
        //const currentTravel = listenToTravel(uid)
        //debugger;

    }

    render () {
        return (
            <MapJournal />
        )
    }
}

function mapStateToProps (state) {
    return {
        appUsers: state.appUsers
    }
}

export default connect(mapStateToProps)(MapContainer)