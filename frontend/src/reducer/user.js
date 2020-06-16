import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthorized: false,
  accessToken: '',
  email: '',
  password: '',
}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    saveAccesToken: (state, action) => {
      state.accessToken = action.payload
    },
    saveUserId: (state, action) => {
      state.email= action.payload
    },
    login: (state) => { state.isAuthorized = true },
    logout: (state) => { state.isAuthorized = false }
  },
 
})