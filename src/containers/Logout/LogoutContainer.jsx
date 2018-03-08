import React, { Component } from 'react'
import Logout from '../../components/Logout/Logout.jsx'
import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { logoutAndUnauth } from '../../redux/appUsers.jsx'
//import createReactClass from 'create-react-class'

class LogoutContainer extends Component {
    componentDidMount () {
        this.props.dispatch(logoutAndUnauth())
    }

    render () {
        return (
            <Logout />
        )
    }
}

export default connect()(LogoutContainer)