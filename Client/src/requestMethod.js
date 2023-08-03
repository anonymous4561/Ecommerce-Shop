import axios from "axios";

var base_url = "https://ecommerce-c51q.onrender.com/api/";
// const currentUser = localStorage.getItem("persist:root") &&  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
 const Token =  localStorage.getItem("persist:root") && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken;



export const publicRequest = axios.create({
   baseURL:base_url
});

export const userRequest = axios.create({
    baseURL:base_url,
    headers:{ token: `Bearer ${Token}` },
});
