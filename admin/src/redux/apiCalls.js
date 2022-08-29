import { publicRequest, Token, userRequest } from "../requestMethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";


 
    export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try {
         const res = await  publicRequest.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const product = async (dispatch)=>{
    dispatch(getProductStart());
    try {
        const res = await  userRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailure());
    }
}

export const deleteProduct = async (dispatch,id)=>{
    dispatch(deleteProductStart());
    try {
    //    const res = await  userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
}
export const updateProduct = async (dispatch,id,product)=>{
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/products/${id}`,{product});
        const {products} = res.data;
        const {_id} =products;
        dispatch(updateProductSuccess({products,_id}));
    } catch (error) {
        dispatch(updateProductFailure());
    }
}
export const addProduct = async (dispatch,product)=>{
    dispatch(addProductStart());
    try {
       const res = await userRequest.post(`/products`,product);
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure());
    }
}