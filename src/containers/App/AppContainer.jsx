import React, { Component } from 'react'
import { NavigationTest } from '../../components/index.jsx'

class AppContainer extends Component {
    render () {
        return (
            <div>
                <NavigationTest isAuthed={false}/>
                {this.props.children}
            </div>
        )
    }
}

export default AppContainer