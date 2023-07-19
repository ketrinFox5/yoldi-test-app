import { createSlice } from '@reduxjs/toolkit';
import { IBoolValue } from '../../interfaces/IBoolValue';

const initialState: IBoolValue = {value: false};

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) =>{
            state.value = action.payload;
        }
    }
})

export const {setIsLoading} = isLoadingSlice.actions;

export default isLoadingSlice.reducer;