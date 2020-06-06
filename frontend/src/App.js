import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {user} from './reducer/user'
import {ContactPage} from './components/Contact-page/ContactPage'


const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store={store}>
      <main>
        <BrowserRouter>
        <div>HERE GOES THE HEADER </div>
          <Switch>
            <Route path="/" exact>
              <a href="/contact"> Contact page </a>
            </Route>
            <Route path="/contact">
              <ContactPage />
            </Route>
            <Route path="">
            </Route> 
          </Switch>
        </BrowserRouter>
      </main>
    </Provider>
  )
}
