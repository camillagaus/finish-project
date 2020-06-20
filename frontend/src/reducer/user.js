import { createSlice } from '@reduxjs/toolkit'
import { ui } from './ui'

const initialState = {
  isAuthorized: false,
  accessToken: '',
  email: '',
  id: '',

  

}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    saveAccesToken: (state, action) => {
      state.accessToken = action.payload
    },
    saveUserId: (state, action) => {
      state.id= action.payload
    },
     userId: (state, action) => {
      state.id = action.payload
     } ,
     autorized: (state) => {
       state.isAuthorized = true
     },
     userEmail: (state, action) => {
       state.email = action.payload
     },

    login: (state) => { state.isAuthorized = true },
    logout: (state) => { state.isAuthorized = false }
    },
    
 
})



// export const userPage = (id) => {
//   return (dispatch) => {
//     dispatch(ui.actions.setLoading(true))
//     fetch(`http://localhost:8080/users/${userId}`, {
//       headers: { Authorization: accessToken },
//     })
//     .then((res) => res.json())
//     .then((json) => {
//       dispatch(user.actions.saveUserId)
//     })
//   }
// }