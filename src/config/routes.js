import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppContainer from '../containers/App/AppContainer.js'

const routes = (
    <Router>
        <div>
            <Route path='/' component={AppContainer} />
        </div>
    </Router>
)

export default routes