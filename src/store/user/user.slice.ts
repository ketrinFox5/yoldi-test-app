import { createSlice } from '@reduxjs/toolkit';
import { IProfile } from '../../interfaces/IProfile';
import { IUserState } from '../../interfaces/IUserState';

const initialState: IUserState = { data: null, isEditModalOpen: false, isSignOut: false };

export const userSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setUser: (state, action)=>{
            state.data = action.payload;
        },
        editUser: (state, action) => {
            const newInfoUser: IProfile = action.payload;
            if (state.data) {
                state.data.name = state.data.name !== newInfoUser.name ? newInfoUser.name : state.data.name;
                state.data.slug = state.data.slug !== newInfoUser.slug ? newInfoUser.slug : state.data.slug;
                state.data.description = state.data.description !== newInfoUser.description ? newInfoUser.description : state.data.description;
            }
        }, 
        openEditModal: (state, action) => {
            state.isEditModalOpen = action.payload;
        },
        setSignOut: (state, action) => {
            state.isSignOut = action.payload;
        }
    }
})

export const {setUser, editUser, openEditModal, setSignOut} = userSlice.actions;

export default userSlice.reducer;
