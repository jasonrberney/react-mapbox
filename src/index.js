import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
//import routes from './config/routes.jsx'
import getRoutes from './config/routesTest.jsx'
import mapboxMapInfo from './redux/mapboxMapInfo.jsx';
import mapData from './redux/mapData.jsx'
import appUsers from './redux/appUsers.jsx'
import { checkIfAuthed } from './helpers/auth.jsx'

const reducers = combineReducers({mapboxMapInfo, mapData, appUsers})
export const store = createStore(reducers, applyMiddleware(thunk))

// For protected routes. Re-routes you to mapjournal if logged in
function checkAuth(nextState, replace) {
    const isAuthed = checkIfAuthed(store)
    const nextPathName = nextState.location.pathname
    if (nextPathName === '/') {
        if (isAuthed === true) {
            replace('/mapjournal')
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        {getRoutes(checkAuth)}
    </Provider>,
    document.getElementById('root')
);
