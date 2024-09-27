const { createSlice } = require("@reduxjs/toolkit");
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// Get QueryClient from the context
// const queryClient = useQueryClient()

const initialState = {};

const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    setColomun: (state, action) => {
      state[action.payload.colId] = action.payload.data;
    },
    addItemToCol: (state, action) => {
      // const itemExists = state[action.payload.id].some(
      //   (obj) => obj.id === action.payload.data.id
      // );

      // if (!itemExists) {
      // }
      state[action.payload.colId].push(action.payload.data);
    },
    removeItemToCol: (state, action) => {
      state[action.payload.colId] = state[action.payload.colId].filter(
        (item) => item.id !== action.payload.targetId
      );
    },
    increaseItem: (state, action) => {
      state[action.payload.colId].forEach((item) => {
        console.log(item)
        if (item.productId === action.payload.targetId) {
          console.log()
          item.count += 1;
        }
      });
    },
    deacraseItem: (state, action) => {
      state[action.payload.colId].forEach((item) => {
        console.log(item)
        if (item.productId === action.payload.targetId) {
          if(item.count === 1){
            const index = state[action.payload.colId].findIndex(item => item.productId === action.payload.targetId);
            if (index !== -1) {
              state[action.payload.colId].splice(index, 1);
              // vqueryClient.invalidateQueries({ queryKey: ['todos'] })
            }
          }
          item.count -= 1;
        }
      });
    }
  },
});

export const dragAndDropActions = dragAndDropSlice.actions;

export default dragAndDropSlice;
