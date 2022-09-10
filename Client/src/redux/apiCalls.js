import { publicRequest } from "../requestMethod";
import {  deleteProductFailure, deleteProductStart, deleteProductSuccess } from "./cartRedux";
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

// export const addCartProduct = async (dispatch,product)=>{
   
//     try {
//         const res=  await  userRequest.post(`/carts/`,
//         {
//         userid:product.currentUserID,
//     //     products: product.map((item) => 
//     //     ( {
//     //     productId: item._id,
//     //     quantity: item.quantity,
//     //    }) ),
//         products:
//             {
//                 productId:product._id,
//                 quantity:product.quantity,
//                 size:product.size,
//                 color:product.color,
//                 img:product.img,
//                 title:product.title,
//                 price:product.price,
//             },
//         }
        
//         );
//         console.log('====================================');
//         console.log(res.data.products[0].price);
//         console.log('====================================');
//         dispatch(addProduct(res.data));
//     } catch (error) {
//         dispatch(errorProduct());
//     }
// }