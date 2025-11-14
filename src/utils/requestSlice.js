import { createSlice } from "@reduxjs/toolkit";

const request = createSlice({
    name : "request",
    initialState : null,
    reducers : {
         addRequest : (state, action) => action.payload,
         removeRequest : (state, action) => {
            const Arr =  state.filter((r) => r._id !== action.payload )
            return Arr
         }
    }
});


export const {addRequest, removeRequest} =  request.actions;
export default request.reducer;