import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  // username: null,
  isAdmin: null,
  isLoggedIn: false
}

const authData = localStorage.getItem('auth')
if(authData){
  initialState = { ...JSON.parse(authData), isLoggedIn: true }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      // state.username = action.payload.username
      state.isAdmin = action.payload.isAdmin 
      state.isLoggedIn = true 
      localStorage.setItem('auth', JSON.stringify({
        // username: action.payload.username,
        isAdmin: action.payload.isAdmin 
      }))
      localStorage.setItem('token', action.payload.token)
    },
    logOut: (state) => {
      state.isLoggedIn = false 
      // state.username = null
      state.isAdmin = null 
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
    }
  },
})

export const { logIn, logOut, profileUpdated } = authSlice.actions

export default authSlice.reducer 