import { combineReducers } from 'redux';
import userReducer from './features/user/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;