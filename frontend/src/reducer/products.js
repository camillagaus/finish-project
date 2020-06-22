import { createSlice } from '@reduxjs/toolkit'
import { ui } from './ui'



const API_URL = 'http://localhost:8080/products'

export const products = createSlice ({
  name: 'products',
  initialState: {
    all: [] 
   

  },
  reducers: {
    setProducts: (state, action) => {
      state.all = action.payload.products
    },
    setProductInfo: (state, action) => {
      state.all = action.payload.products
    },
    setProductId: (state, action) => {
      state.id = action.payload
    }

  }

  })

  export const fetchProducts = () => {
    return (dispatch) => {
      dispatch(ui.actions.setLoading(true))
      fetch(API_URL)
      .then((res) => res.json())
      
      .then((json) => {
        dispatch(products.actions.setProducts({ products: json }))
        console.log('json:', json)
        dispatch(ui.actions.setLoading(false))
      })
    }
  }

  export const singleProduct = (id) => {
    return (dispatch) => {
      dispatch(ui.actions.setLoading(true))
      fetch(`http://localhost:8080/products/${id}`)
      .then((res) => res.json())

      .then((json) => {
        dispatch(products.actions.setProductInfo({currentProducts: json}))
        console.log('json', json)
        dispatch(ui.actions.setLoading(false))
      })
    }
  }




