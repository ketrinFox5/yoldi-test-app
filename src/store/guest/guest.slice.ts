import { createSlice } from '@reduxjs/toolkit';
import { IGuestState } from '../../interfaces/ IGuestState';

const initialState: IGuestState = {data: null};

export const guestSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setGuest: (state, action)=>{
            state.data = action.payload;
        },
        
    }
})

export const {setGuest} = guestSlice.actions;

export default guestSlice.reducer;