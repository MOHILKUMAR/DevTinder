import { createSlice } from "@reduxjs/toolkit";




const connectionSlice  = createSlice({
    name : "UserConnections",
    initialState : null,
    reducers : {
        addConnections: (state, action) => action.payload,
        removeUserFromFeed : (state, action ) => {
            const newFeed = state.filter(user => user._id !== action.payload);
            return newFeed;
        }  
    }
})


export const {addConnections , removeUserFromFeed } = connectionSlice.actions;

export default connectionSlice.reducer;