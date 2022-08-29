const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userid:{
        type:String, required:true,unique:false  },
    products:[{
         productId:{type:String},
          quantity:{
            type:Number,
            default:1
          }
    }],
    amount:{type:Number,required:true},
    address:{type:Object,},
    status:{type:String,default:"pending"},
    

},{
    timestamps:true,
});

module.exports = mongoose.model("Orders",orderSchema);

