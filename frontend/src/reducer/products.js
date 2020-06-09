import { createSlice } from '@reduxjs/toolkit'
import { ui } from './ui'

export const products = createSlice({
  name: 'products',
  initialState: {
    all: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.all = action.payload.products
    }
  }

  })

  export const fetchProducts = () => {
    return (dispatch) => {
      dispatch(ui.actions.setLoading(true))
      fetch('http://localhost:8080/products')
      .then((res) => res.json())
      .then((json) => {
        dispatch(products.actions.setProducts( json ))
        console.log(json)
        dispatch(ui.actions.setLoading(false))
      })
    }
  }




