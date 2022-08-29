const jwt = require("jsonwebtoken");


module.exports.verifyToken = (req,res,next)=>{
  const header = req.headers.token;
  if(header){
  const token = header.split(" ")[1];
  jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err) { res.status(402).json("token is not valid or expired");
console.log(err);
}
    req.user = user;
    next();
    
  });
}else{
    res.status(401).json("You are not authenticated");
}

}

module.exports.verifyTokenAndAuthorization = (req,res,next)=>{
    this.verifyToken(req,res,()=>{
        if(req.params.id===req.user.id||req.user.isAdmin){
            next();
        }else{
            res.status(403).status("You are not allowed to do that");
        }
    });
}

module.exports.verifyTokenAndAdmin = (req,res,next)=>{
    this.verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).status("You are not allowed to do that");
        }
    });
}