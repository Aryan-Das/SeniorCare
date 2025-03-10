const jwt = require('jsonwebtoken')
require('dotenv').config()
function auth(req,res,next){
    try{
        const token = req.cookies.token;
        //console.log(req.headers.cookie);
        if (!token){
            return res.status(401).json({errorMessage:"Unauthorized"});
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified.user;
        next();
    }catch (err){
        console.error(err);
        res.status(401).json({errorMessage:"Unauthorized"})
    }
}

module.exports = auth;