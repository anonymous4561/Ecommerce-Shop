import {createSlice} from '@reduxjs/toolkit';



const cartSlice = createSlice({
    name:"cart",
    initialState:{
        quantity:0,
        products:[],
        Paytotal:0,
        isFetching:false,
        error:false,
    },
    reducers:{
        addProduct:(state,action)=>
         {
            state.quantity += 1;
            state.Paytotal +=action.payload.price *action.payload.quantity;
            state.products.push(action.payload);
         },
         errorProduct:(state)=>{
            state.error=true;
         },
          //Delete
       deleteProductStart:(state)=>{
        state.isFetching=true;
       },
       deleteProductSuccess :(state,action)=>{
        state.isFetching=false;
        state.products.splice(
            state.products.findIndex((item)=>item._id===action.payload._id),1
        );
        state.quantity -= 1;
        state.Paytotal -= action.payload.price *action.payload.quantity;
       },
       deleteProductFailure:(state)=>{
        state.error=true;
    }
    }
});

export const {addProduct, errorProduct,deleteProductFailure,deleteProductSuccess,deleteProductStart} = cartSlice.actions;
export  default cartSlice.reducer;