const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");

const  Cart  = require("../models/Cart");

const router = require("express").Router();

//create

router.post("/",verifyToken,async(req,res)=>{
 const newCart = new Cart(req.body);
 try {
    const cart = await newCart.save();
    res.status(200).json(cart);
 } catch (error) {
    res.status(500).json(error);
 }
});



//update 
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{ $set:req.body },{new:true});
    res.status(200).json(updatedCart);

    }catch(err){
        res.status(500).json(err.data);
    }
});

//delete

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
 try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("successfully deleted");
 } catch (error) { res.status(500).json(err);  }
});

//get user cart

router.get("/find/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
       const cart= await Cart.findOne({userid:req.params.id});
       res.status(200).json(cart);
    } catch (error) { res.status(500).json(err);  }
   });

//get All cart

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
   
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);

    } catch (error) { res.status(500).json(err);  }
   });




module.exports =router;