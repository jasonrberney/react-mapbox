import React, { Component } from 'react'
import Login from '../../components/Login/Login.jsx'
//import auth from '../../helpers/auth.jsx'
import { connect } from 'react-redux'
import { bindActionCreators, dispatch } from 'redux'
import * as appUsersActionCreators from '../../redux/appUsers.jsx'

class LoginContainer extends Component {
    constructor(props) {
        super(props)

        this.handleAuth = this.handleAuth.bind(this)
    }

    handleAuth () {
        this.props.dispatch(appUsersActionCreators.fetchAndHandleAuthedUser())
        // this.props.dispatch(appUsersActionCreators.fetchingUser())
        // auth().then((user) => {
        //     this.props.dispatch(appUsersActionCreators.fetchingUserSuccess(user.uid, user, Date.now()))
        //     this.props.dispatch(appUsersActionCreators.authUser(user.uid))
        //     console.log('Authed User', user)
        // })
        // .catch((error) => this.props.dispatch(appUsersActionCreators.fetchingUserFailure(error)))
    }

    render() {
        return (
            <Login isFetching={this.props.isFetching} error={this.props.error} onAuth={this.handleAuth} />
        )
    }
}

function mapStateToProps(state) {
    console.log('STATE', state)
    return {
        isFetching: state.appUsers.isFetching,
        error: state.appUsers.error,
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(appUsersActionCreators, dispatch)
}

export default connect(mapStateToProps)(LoginContainer)