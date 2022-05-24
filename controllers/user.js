const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv/config')

const registerUser = async (req, res)=>{
    //Get user detail from request body and store it in varibles
    const {name, email, password} = req.body
    
    try{
        //check fields are not empty
        if(!name || !email || !password){
            throw "Please fill the fields"
        }

        //find the email in database and if it exsist throw error => user alsreay exsists
        const userAlready = await User.findOne({email})
        if (userAlready) {
            throw "User already exsists"
        }

        //create user and save in database
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await user.save()

        res.json({
            _id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email
        })


    }catch(e){
        res.status(400).json({error: e})
    }
}

const loginUser = async (req, res)=>{
    //get credentials from request body
    const {email, password} = req.body 
    try{
        //find user with that email
        const user = await User.findOne({email})
        //compare password with the stored hashed password
        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            })
        }else{
            throw "Wrong credentials"
        }

    }catch(e){
        res.status(400).json({error: e})
    }
}

const getUser = async(req, res)=>{
    res.json(req.user)
}


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: '20d'
    })
}

module.exports = {registerUser, loginUser, getUser}