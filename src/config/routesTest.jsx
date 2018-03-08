import React from 'react'
import { Router, hashHistory, IndexRoute, Route } from 'react-router'
import { AppContainer, HomeContainer, MapContainer, LoginContainer, LogoutContainer } from '../containers'


export default function getRoutes(checkAuth) {
    return(
        <Router history={hashHistory}>
            <Router path='/' component={AppContainer}>
                <Route path='/mapjournal' component={MapContainer} onEnter={checkAuth}/>
                <Route path='/auth' component={LoginContainer} onEnter={checkAuth}/>
                <Route path='/logout' component={LogoutContainer} />
                {/* If none of the Routes match, you'll always go to the index route. */}
                <IndexRoute component={HomeContainer} onEnter={checkAuth}/>
            </Router>
        </Router>
    )
}

// THE BELOW WAS USED BEFORE USING ROUTE PROTECTION.
// const routes = (
//     <Router history={hashHistory}>
//         <Router path='/' component={AppContainer}>
//             <Route path='/mapjournal' component={MapContainer}/>
//             <Route path='/auth' component={LoginContainer} />
//             {/* If none of the Routes match, you'll always go to the index route. */}
//             <IndexRoute component={HomeContainer} />
//         </Router>
//     </Router>
// )

// export default routes