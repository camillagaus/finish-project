import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {user} from './reducer/user'
import {ContactPage} from './components/Contact-page/ContactPage'
import { Header } from './components/Home-page/Header'
import { Footer } from './components/Home-page/Footer'

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store={store}>
      
        <BrowserRouter>
        <Header />
          <Switch>
            <Route path="/" exact>
              
            </Route>
            <Route path="/contact">
              <ContactPage />
            </Route>
            <Route path="">
            </Route> 
          </Switch>
          <Footer />
        </BrowserRouter>
      
     
    </Provider>
  )
}
