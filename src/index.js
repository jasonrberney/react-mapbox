import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import routes from './config/routes.jsx'
import mapboxMapInfo from './redux/mapJournal.jsx';
import mapData from './redux/mapData.jsx'

//const reducers = combineReducers({mapboxMapInfo})
const store = createStore(mapboxMapInfo)

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
