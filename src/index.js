import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import routes from './config/routes.jsx'
import mapboxMap from './redux/mapJournal.jsx';

const store = createStore(mapboxMap)

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
