const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const  Product  = require("../models/Product");

const router = require("express").Router();

//create

router.post("/",verifyTokenAndAdmin,async(req,res)=>{
 const newProduct = new Product(req.body);
 try {
    const product = await newProduct.save();
    res.status(200).json(product);
 } catch (error) {
    res.status(500).json(error);
 }
});



//update 
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{ $set:req.body },{new:true});
    res.status(200).json(updatedProduct);

    }catch(err){
        res.status(500).json(err.data);
    }
});

//delete

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
 try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("successfully deleted");
 } catch (error) { res.status(500).json(err);  }
});

//get products

router.get("/find/:id",async(req,res)=>{
    try {
       const product= await Product.findById(req.params.id);
       res.status(200).json(product);
    } catch (error) { res.status(500).json(err);  }
   });

//get All products

router.get("/",async(req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let product;
     if(qNew){
       product =  await Product.find().sort({createdAt:-1}).limit(1);
     }else if(qCategory){
         product = await Product.find({categories:{
            $in:[qCategory],
         }});

     }else {
        product = await Product.find();
     }
     res.status(200).json(product);

    } catch (error) { res.status(500).json(err);  }
   });




module.exports =router;