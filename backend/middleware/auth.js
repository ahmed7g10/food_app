import jwt from 'jsonwebtoken';

const authMiddleware =async (req, res, next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false, message:"Token not provided"});
    }
    try {
        const token_decode=jwt.verify(token,"ahmed")
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message:"Token is not valid"});
    }
}

export default authMiddleware;