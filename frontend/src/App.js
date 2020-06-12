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
import { Products } from './components/Products-and-cart/Products'
import { ProductMoreInfo } from './components/Products-and-cart/ProductMoreInfo'


const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
  cart: cart.reducer,
  products: products.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
        <Header />
          <Switch>
            <Route path="/" exact>
              <Products />
            </Route>
            <Route path="/products/:productId" exact>
              <ProductMoreInfo />
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
