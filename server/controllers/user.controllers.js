const User = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRETKEY = process.env.SECRET_KEY


module.exports.registerUser = async (req,res)=>{
    try{
        const newUser = await User.create(req.body)
        const userToken = jwt.sign({_id:newUser._id, email:newUser.email},SECRETKEY)
        res.status(200).cookie('userToken',userToken,{httpOnly:true,expires:new Date(Date.now() + 90000)}).json({message:'User Registered',user:newUser})
    }
    catch(err){
        res.status(400).json({message:'Register failed'})
    }
}

module.exports.loginUser = async (req,res)=>{
    const existingUser = await User.findOne({email:req.body.email})
    if(!existingUser){
        res.status(400).json({message:"User doesn't exist"})
    }
    try{
        const isPwdValid = await bcrypt.compare(req.body.password, existingUser.password)
        if(!isPwdValid){
            res.status(400).json({message:"Invalid Data"})
        } else{ 
            
        const userToken = jwt.sign({_id:existingUser._id, email:existingUser.email},SECRETKEY)
        res.status(200).cookie('userToken',userToken,{httpOnly:true,expires:new Date(Date.now() + 90000)}).json({message:'User Logged in',user:existingUser})
    }
    }
    catch(err){
        res.status(400).json({message:'Login failed'})
    }
}

module.exports.logoutUser=(req,res)=>{
    res.clearCookie('userToken')
    res.status(200).json({message:"Successfully logged out!"})
}
