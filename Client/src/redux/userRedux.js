import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=> {
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.error=true;
    },
    logout:(state)=>{
        state.currentUser=null;
        state.error=false;
        state.isFetching=false;
    }
    }
})

export const {loginFailure,loginStart,loginSuccess,logout} = userSlice.actions;
export default userSlice.reducer;