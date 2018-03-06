import React, { Component } from 'react'
import Login from '../../components/Login/Login.jsx'
import auth from '../../helpers/auth.jsx'

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
        return (
            <Login onAuth={this.handleAuth} />
        )
    }
}

export default LoginContainer