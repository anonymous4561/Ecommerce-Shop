import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"user",
    initialState:{
        isFetching:false,
        currentUser:null,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
    },
    loginFailure:(state)=>{
        state.error=true;
    },
    logout:(state)=>{
        state.currentUser=null;
    }

    }
});

export const {loginFailure,loginStart,loginSuccess,logout} = userSlice.actions;
export default userSlice.reducer;