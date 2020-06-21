import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers, applyMiddleware, compose } from '@reduxjs/toolkit'
import { createStore } from 'redux'

import thunk from 'redux-thunk'



import { user } from './reducer/user'
import { cart } from './reducer/cart'
import { products } from './reducer/products'
import { ui } from './reducer/ui'

import { ContactPage } from './components/Contact-page/ContactPage'
import { Header } from './components/Home-page/Header'
import { Footer } from './components/Home-page/Footer'
import { SignIn } from './components/Sign-in page/SignIn'
import { SignUp } from './components/Sign-up page/SignUp'
import { Products } from './components/Products-and-cart/Products'
import { ProductMoreInfo } from './components/Products-and-cart/ProductMoreInfo'
import { UserHomePage } from './components/User-page/UserHomepage'
import { Checkout } from './components/Purchases/Checkout'
import { AboutPage } from 'components/About-page/AboutPage'


const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
  cart: cart.reducer,
  products: products.reducer
})


const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.log(error)
  }
}


const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadFromLocalStorage()

const store = createStore(reducer, persistedState, composeEnhancer(applyMiddleware(thunk)))


 store.subscribe(() => saveToLocalStorage(store.getState()))

//const store = createStore(reducer)
//const store = configureStore({ reducer, persistedState })
export const App = () => {

 
  

  return (
    <Provider store={store}>
        <BrowserRouter>
        <Header />
          <Switch>
            <Route path="/" exact>
              <Products />
            </Route>
            <Route path="/products/:id" exact>
              <ProductMoreInfo />
            </Route>
            <Route path="/contact">
              <ContactPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route> 
            <Route path="/sign-up">
              <SignUp />
            </Route> 
            <Route path="/user-page">
              <UserHomePage />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
    </Provider>
  )
}
