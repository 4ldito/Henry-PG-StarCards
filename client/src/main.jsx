import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0Provider
          domain='dev-tshwvs2h.us.auth0.com'
          clientId='lYhtCw3VbmPTJgu0jHaJr1iDWvlNHL0W'
          redirectUri='http://127.0.0.1:5173/register'
        >
          <App />
        </Auth0Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
