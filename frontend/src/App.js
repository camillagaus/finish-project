import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {user} from './reducer/user'


const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store={store}>
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="" exact>
            </Route>
            <Route path="">
            </Route>
            <Route path="">
            </Route> 
          </Switch>
        </BrowserRouter>
      </main>
    </Provider>
  )
}
