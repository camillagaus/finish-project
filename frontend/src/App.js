import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {user} from './reducer/user'
import {ContactPage} from './components/Contact-page/ContactPage'
import { Header } from './components/Home-page/Header'

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store={store}>
      <main>
        <BrowserRouter>
        <Header />
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
