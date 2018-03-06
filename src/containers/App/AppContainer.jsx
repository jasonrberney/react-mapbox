import React, { Component } from 'react'
import { NavigationTest } from '../../components/index.jsx'

class AppContainer extends Component {
    render () {
        return (
            <div>
                <NavigationTest isAuthed={true}/>
                {this.props.children}
            </div>
        )
    }
}

export default AppContainer