import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  isMultipleModeEnabled: false,
}

const gameModeData = localStorage.getItem('multipleMode')
if(gameModeData){
  initialState.isMultipleModeEnabled = true
}

export const gameModeSlice = createSlice({
  name: 'gamemode',
  initialState,
  reducers: {
    toggleGameMode: (state) => {
      state.isMultipleModeEnabled = !state.isMultipleModeEnabled

      if(state.isMultipleModeEnabled){
        localStorage.setItem('multipleMode', 'true')
      }else {
        localStorage.removeItem('multipleMode')
      }
    }
  },
})

export const { toggleGameMode } = gameModeSlice.actions

export default gameModeSlice.reducer  