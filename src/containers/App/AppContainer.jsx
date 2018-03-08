import React, { Component } from 'react'
import { NavigationTest } from '../../components/index.jsx'
import { connect } from 'react-redux'

class AppContainer extends Component {
    render () {
        console.log('props', this.props)
        return (
            <div>
                <NavigationTest isAuthed={this.props.isAuthed}/>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    (state) => ({isAuthed: state.appUsers.isAuthed})
)(AppContainer)