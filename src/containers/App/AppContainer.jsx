import React, { Component } from 'react'
import { Navigation } from '../../components/index.jsx'
import { connect } from 'react-redux'
import * as appUsersActionCreators from '../../redux/appUsers.jsx'
import { formatUserInfo } from '../../helpers/utils.jsx'
import { firebaseAuth } from '../../config/constants.jsx'

class AppContainer extends Component {
    componentDidMount () {
        // This callback is responsible and invoked whenever the authentication state of the user is changed.
        // This is a synchronous change function
        firebaseAuth().onAuthStateChanged((user) => {
            //if user meaning if we're logged in
            if (user) {
                const userData = user.providerData[0]
                const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
                this.props.dispatch(appUsersActionCreators.authUser(user.uid))
                this.props.dispatch(appUsersActionCreators.fetchingUserSuccess(user.uid, userInfo, Date.now()))
                // IF you get context to work, you can redirect the router using the code below
                // if (this.props.location.pathname === '/') {
                //     this.context.router.replace('/mapjournal')
                // }
            }
            else {
                this.props.dispatch(appUsersActionCreators.removeFetchingUser())
            }
        })
    }
    render () {
        return this.props.isFetching === true
            ? null
            :   <div>
                    <Navigation isAuthed={this.props.isAuthed}/>
                    {this.props.children}
                </div>
    }
}

export default connect(
    (state) => ({
        isAuthed: state.appUsers.isAuthed,
        isFetching: state.appUsers.isFetching
    })
)(AppContainer)