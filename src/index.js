import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
//import routes from './config/routes.jsx'
import routes from './config/routesTest.jsx'
import mapboxMapInfo from './redux/mapboxMapInfo.jsx';
import mapData from './redux/mapData.jsx'
import appUsers from './redux/appUsers.jsx'

const reducers = combineReducers({mapboxMapInfo, mapData, appUsers})
export const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
