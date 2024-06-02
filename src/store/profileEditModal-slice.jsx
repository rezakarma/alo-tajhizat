const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const profileEditModalSlice = createSlice({
    name: 'profileEditModal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state[action.payload] = true
        },
        closeModal: (state, action) => {
            state[action.payload] = false
        }
    }
})


export const profileEditMoadalAction = profileEditModalSlice.actions;

export default profileEditModalSlice;