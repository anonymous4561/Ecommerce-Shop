const router = require("express").Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register

router.post("/register",async (req,res)=>{
    const hashedPassword = cryptoJS.AES.encrypt(req.body.password,process.env.HASHEDPASSWORD).toString();
    const user = new User({
        username:req.body.username,
        mobile:req.body.mobile,
        password:hashedPassword
    });
try{
    const savedUser = await user.save();
    res.status(200).json(savedUser);
}catch(err){
    res.status(500).json(err);
}
});

//login

router.post("/login",async(req,res)=>{
   try {
    const user = await User.findOne({
        username:req.body.username
    });
    if(!user) 
     return res.status(401).json("no user Credentials");
    
     const hashedPassword = cryptoJS.AES.decrypt(user.password,process.env.HASHEDPASSWORD);
    const Password = hashedPassword.toString(cryptoJS.enc.Utf8);
  
   if(Password!==req.body.password)
   return  res.status(401).json("Wrong password Credentials");

   const accessToken = jwt.sign({
    id:user._id,
    isAdmin:user.isAdmin
   }, process.env.JWT,{expiresIn:"3d"});
   const {password, ...others} = user._doc;
     return res.status(200).json({...others,accessToken});

   } catch (error) {
    res.status(500).json(error.message);
   }
});

module.exports = router;