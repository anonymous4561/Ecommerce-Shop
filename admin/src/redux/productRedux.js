import {createSlice} from '@reduxjs/toolkit';



const productSlice = createSlice({
    name:"product",
    initialState:{
        isFetching:false,
        products:[],
        error:false,
    },
    reducers:{
        //getAll
       getProductStart:(state)=>{
        state.isFetching = true;
       },
       getProductSuccess:(state,action)=>{
        state.isFetching=false;
        state.products=action.payload;
       },
       getProductFailure:(state)=>{
        state.error=true;
       },
       //Delete
       deleteProductStart:(state)=>{
        state.isFetching=true;
       },
       deleteProductSuccess :(state,action)=>{
        state.isFetching=false;
        state.products.splice(
            state.products.findIndex((item)=>item._id===action.payload),1
        );
       },
       deleteProductFailure:(state)=>{
        state.error=true;
    }
    , //UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[state.products.findIndex((item)=>item._id===action.payload.id)]=action.payload.product;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Add
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;


