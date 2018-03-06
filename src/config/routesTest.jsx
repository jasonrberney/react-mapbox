import React from 'react'
import { Router, hashHistory, IndexRoute, Route } from 'react-router'
import { AppContainer, HomeContainer, MapContainer, LoginContainer } from '../containers'

const routes = (
    <Router history={hashHistory}>
        <Router path='/' component={AppContainer}>
            <Route path='/mapjournal' component={MapContainer} />
            <Route path='/auth' component={LoginContainer} />
            {/* If none of the Routes match, you'll always go to the index route. */}
            <IndexRoute component={HomeContainer} />
        </Router>
    </Router>
)

export default routes