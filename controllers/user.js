const User = require("../models/user")

const registerUser = async (req, res)=>{
    const data = req.body
    console.log(data);
    res.json({message: "User is registered"})
}

module.exports = {registerUser}