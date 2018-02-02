import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MapContainer from '../containers/Map/MapContainer.jsx'
import HomeContainer from '../containers/Home/HomeContainer.jsx'
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