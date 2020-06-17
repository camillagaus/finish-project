import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    items: []
  }

export const cart = createSlice({
  name:'cart',
  initialState: initialState,
  reducers: {
    //an action is a key and the value is a function to call that key, redux will pass us a state and an action 
    // the current state and the action (action has a name and a payload, payload is whatever we pass into the action when we invoke it)
    
    addItem: (state, action) => {
      console.log(action)
      
      //we create this to make sure we don't get any duplicated products in our basket, we just want to increment the quantity. 
      const existingProduct = state.items.find((item) => item._id === action.payload._id)

      if (existingProduct) {
        //increment quantity
        existingProduct.quantity += 1
      } else {
        //we take the payload and add it to items (the products will be the payload)
      // We want to add a property for quantity, so we make an object and add quantity property. 
        state.items.push({...action.payload, quantity: 1})
      }

    },
    removeItem: (state, action) => {
      //checking if we have the current product in our basket (which we should)
      const existingProduct = state.items.find((item) => item._id === action.payload._id)

      if (existingProduct && existingProduct.quantity === 1) {
        // remove it, this will filter out the product that was in the payload, so it will create a new array without that product. 
        state.items = state.items.filter((item) => item._id !== action.payload._id)
      } else if (existingProduct) {
        //remove quantity by one 
        existingProduct.quantity -= 1
      }
    }, 
    removeAll: () => {
      return initialState
    }
  }
})

export const submitOrder = (
  products, 
  userId,
  firstName,
  lastName,
  email,
  address,
  zipCode,
  city,
  phoneNumber,
  accessToken
) => {
  return (dispatch) => {
    fetch('http://localhost:8080/orders', {
    method: 'POST',
    body: JSON.stringify({
        products: products,
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        zipCode: zipCode,
        city: city,
        phoneNumber: phoneNumber,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
    }).then(() => {
      dispatch(cart.actions.removeAll)
    })
  }
}