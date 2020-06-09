import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { user } from './reducer/user'
import { cart } from './reducer/cart'
import { products } from './reducer/products'
import { ui } from './reducer/ui'
import { ContactPage } from './components/Contact-page/ContactPage'
import { Header } from './components/Home-page/Header'
import { Footer } from './components/Home-page/Footer'
import { SignIn } from './components/Sign-in page/SignIn'

const reducer = combineReducers({
  user: user.reducer,
  cart: cart.reducer,
  products: products.reducer,
  ui: ui.reducer
})

const store = configureStore({ reducer })

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
            <Route path="/sign-in">
              <SignIn />
            </Route> 
          </Switch>
          <Footer />
        </BrowserRouter>
    </Provider>
  )
}
