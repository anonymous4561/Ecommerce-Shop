const express = require("express");
const app = express();
const cors = require("cors");
const mongoose =require("mongoose");
const authRoute =require("../routes/auth");
const userRoute =require("../routes/user");
const productRoute = require("../routes/product");
const cartRoute = require("../routes/cart");
const orderRoute =  require("../routes/order");
const payment =require("../routes/stripe");
app.use(express.json());
app.use(cors());
require("dotenv").config();
 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("db connnected successfully");
}).catch((err)=>{
    console.log(err);
});

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",payment);
app.listen(process.env.PORT || 5000,()=>{
    console.log(`server connected successfully on Port ${process.env.PORT}`);
})