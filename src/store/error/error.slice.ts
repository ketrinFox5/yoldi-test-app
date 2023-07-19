import { createSlice } from '@reduxjs/toolkit';

const initialState = {message: null};

export const errorSlice = createSlice({
    name: 'error',
    initialState: initialState,
    reducers: {
        setError: (state, action) =>{
            state.message = action.payload;
        }
    }
})

export const {setError} = errorSlice.actions;

export default errorSlice.reducer;