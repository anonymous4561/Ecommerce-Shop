const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userid:{
        type:String,        required:true },
    products:[{
         productId:{type:String},
          quantity:{
            type:Number,
            default:1
          },
          size:{
            type:String,
          },
          color:{
            type:String
          },
          img:{
            type:String
          },
          title:{
            type:String,
          },
          price:{
            type:Number
          },
        // type:Object,
    }],
    
    

},{
    timestamps:true,
});

module.exports = mongoose.model("Cart",cartSchema);

