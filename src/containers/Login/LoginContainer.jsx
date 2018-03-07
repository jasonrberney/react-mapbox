import React, { Component } from 'react'
import Login from '../../components/Login/Login.jsx'
import auth from '../../helpers/auth.jsx'
import { connect } from 'react-redux'
import * as appUsersActionCreators from '../../redux/appUsers.jsx'

class LoginContainer extends Component {
    constructor(props) {
        super(props)
    }

    handleAuth () {
        auth().then((user) => {
            console.log('Authed User', user)
        })
    }

    render() {
        console.log(this.props)
        return (
            <Login isFetching={this.props.isFetching} error={this.props.error} onAuth={this.handleAuth} />
        )
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.appUsers.isFetching,
        error: state.appUsers.error,
    }
}

export default connect(mapStateToProps)(LoginContainer)