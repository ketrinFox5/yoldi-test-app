import { createSlice } from '@reduxjs/toolkit';
import { IBoolValue } from '../../interfaces/IBoolValue';

const initialState: IBoolValue = {value: false};

export const isOwnerSlice = createSlice({
    name: 'isOwner',
    initialState: initialState,
    reducers: {
        setIsOwner: (state, action)=>{
            state.value = action.payload;
        }
    }
})

export const {setIsOwner} = isOwnerSlice.actions;

export default isOwnerSlice.reducer;