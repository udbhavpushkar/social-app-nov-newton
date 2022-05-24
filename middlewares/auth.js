const { header } = require("express/lib/request")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
require('dotenv/config')

const authorize = async(req, res, next)=>{
    try{
        let token

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            
            //get token from header
            token = req.headers.authorization.split(" ")[1]

            //verify token
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            const currentUser = await User.findById(decoded.id).select('-password')

            req.user = currentUser

            next()

        }else{
            throw "No authorization"
        }

        if(!token){
            throw "Not authorized, No token"
        }

    }catch(e){
        res.status(400).json({message: e})
    }
}

module.exports = {authorize}