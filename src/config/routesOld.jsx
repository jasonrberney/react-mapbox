import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// '../containers' with resolve in const base in webpack config
import { HomeContainer, MapContainer } from '../containers'
import Navigation from '../components/Navigation/Navigation.jsx'

const routes = (
    <Router>
        <div>
            <Navigation />
            <Switch>
                <Route exact path='/' component={HomeContainer} />
                <Route path='/mapjournal' component={MapContainer} />
            </Switch>
        </div>
    </Router>
)

export default routes