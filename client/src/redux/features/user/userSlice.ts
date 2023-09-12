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
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
