import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
// MUI Part
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
// RTK Part
import { Provider } from 'react-redux'
import { store } from './app/store'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)