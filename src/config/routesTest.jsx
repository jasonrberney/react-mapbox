import React from 'react'
import { Router, hashHistory, IndexRoute } from 'react-router'
import { AppContainer, HomeContainer } from '../containers'

const routes = (
    <Router history={hashHistory}>
        <Router path='/' component={AppContainer}>

            {/* If none of the Routes match, you'll always go to the index route. */}
            <IndexRoute component={HomeContainer} />
        </Router>
    </Router>
)

export default routes