import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppContainer from '../containers/App/AppContainer.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'

const routes = (
    <Router>
        <div>
            <Navigation />
            <Switch>
                <Route exact path='/' component={AppContainer} />
                <Route exact path='/test' component={AppContainer} />
            </Switch>
        </div>
    </Router>
)

export default routes