import { publicRequest, userRequest } from "../requestMethod";
import { deleteProductFailure, deleteProductStart, deleteProductSuccess } from "./cartRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";


export const login = async (dispatch,user)=>{
    dispatch(loginStart);
    try {
        const res = await publicRequest.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const register = async (dispatch,user)=>{
    dispatch(loginStart);
    try {
        const res = await publicRequest.post("/auth/register",user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const deleteProduct = async (dispatch,product)=>{
    dispatch(deleteProductStart());
    try {
     //  await  userRequest.delete(`/carts/${id}`);
        dispatch(deleteProductSuccess(product._id,product.price));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
}