import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { combineReducers } from 'redux'

import gameReducer from './app/reducers/game.reducer'
import App from './app/App';


const rootReducer = combineReducers({
  gameReducer
})


let store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
