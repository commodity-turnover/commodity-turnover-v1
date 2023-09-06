import { createSlice } from '@reduxjs/toolkit'

interface responseData {
  login: boolean,
  token: string,
  userData: any
}

const initialState: responseData = {
  login: false,
  token: '',
  userData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.login = action.payload.data.login
      state.token = action.payload.data.token
      state.userData = action.payload.data.userData
    },
    clearUser: (state) => {
      state.login = false
      state.token = ''
      state.userData = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
