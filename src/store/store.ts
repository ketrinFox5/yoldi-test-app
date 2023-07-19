import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import errorSlice from './error/error.slice';
import guestSlice from './guest/guest.slice';
import isLoadingSlice from './loading/isLoading.slice';
import isOwnerSlice from './owner/isOwner.slice';
import pathSlice from './path/path.slice';
import userSlice from './user/user.slice';
import reducer from './user/user.slice';

// const reducers = combineReducers({reducer});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store =  configureStore({
    reducer: { 
        user: userSlice,
        guest: guestSlice,
        path: pathSlice,
        error: errorSlice,
        isOwner: isOwnerSlice,
        isLoading: isLoadingSlice,
    },
});