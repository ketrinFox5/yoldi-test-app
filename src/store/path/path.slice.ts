import { createSlice } from '@reduxjs/toolkit';
import { IPathState } from '../../interfaces/IPathState';

const initialState: IPathState = {value: window.location.pathname.toString()};

export const pathSlice = createSlice({
    name: 'path',
    initialState: initialState,
    reducers: {
        setPathAccount: state =>{
            state.value = '/account';
        },
        setPathLogin: state => {
            state.value = '/login';
        },
        setPathAccountGuest: (state, action) => {
            state.value = `/account/${action.payload}`;
        },
        setPathUsers: state => {
            state.value = '/users';
        }
    }
})

export const {setPathAccount, setPathLogin, setPathAccountGuest, setPathUsers} = pathSlice.actions;

export default pathSlice.reducer;