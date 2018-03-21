import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
//import routes from './config/routes.jsx'
import getRoutes from './config/routes.jsx'
import mapboxMapInfo from './redux/mapboxMapInfo.jsx';
import mapData from './redux/mapData.jsx'
import appUsers from './redux/appUsers.jsx'
import listeners from './redux/listeners.jsx'
import { checkIfAuthed } from './helpers/auth.jsx'

const reducers = combineReducers({mapboxMapInfo, mapData, appUsers, listeners})
export const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    // hooks up Redux chrome extension. If extension does not exist, only take the first argument
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

// For protected routes. Re-routes you to mapjournal if logged in
function checkAuth(nextState, replace) {
    if (store.getState().appUsers.isFetching === true) {
        return
    }

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
