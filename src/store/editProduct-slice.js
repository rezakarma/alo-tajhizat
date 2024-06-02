const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    
}


const editProductSlice = createSlice({
    name:'editProduct',
    initialState,
    reducers:{
        editProduct(state){
            return state;
        }
    }
})

export default editProductSlice;
export const { editProduct } = editProductSlice.actions;