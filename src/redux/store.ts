import {configureStore} from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import {useDispatch as dispatch} from 'react-redux';

const store = configureStore({
  reducer: {app: appSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch = () => dispatch<AppDispatch>();

export default store;
