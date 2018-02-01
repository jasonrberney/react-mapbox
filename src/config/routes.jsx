import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppContainer from '../containers/App/AppContainer.jsx'
import HomeContainer from '../containers/Home/HomeContainer.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'

const routes = (
    <Router>
        <div>
            <Navigation />
            <Switch>
                <Route exact path='/' component={HomeContainer} />
                <Route exact path='/test' component={AppContainer} />
            </Switch>
        </div>
    </Router>
)

export default routes