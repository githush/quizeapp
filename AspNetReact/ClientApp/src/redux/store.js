import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice/authSlice'
import gameModeSlice from './gameSlice/gameModeSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    gameMode: gameModeSlice
  },
})