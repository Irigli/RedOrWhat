const jwt = require('jsonwebtoken')
const SK = process.env.SECRET_KEY

module.exports.authenticate = (req,res,next)=>{
    jwt.verify(req.cookies.userToken,SK,(err,payload)=>{
        if(err){
            console.log('Authentication failed!')
            res.status(400).json({verified:false})
        }
        else{
            console.log('User Authenticated')
            next()
        }
    })
}