import { createSlice } from '@reduxjs/toolkit'

interface responseData {
  login: boolean,
  userData: any
}

const initialState: responseData = {
  login: false,
  userData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.login = action.payload.login
      state.userData = action.payload.userData
    },
    clearUser: (state) => {
      state.login = false
      state.userData = null
    },
    setActiveData: (state) => {
      state.userData.is_active = !state.userData.is_active
    }
  },
})

export const { setUser, clearUser, setActiveData } = userSlice.actions

export default userSlice.reducer
