import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import "./sass/main.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode >,
)
