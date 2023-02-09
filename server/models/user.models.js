const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    username:{
        type: String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timestamps:true})

//Middleware
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then((hashedPassword)=>{
        console.log('My hash pwd:', hashedPassword)
        this.password = hashedPassword
        next()
    })
    .catch((err)=>{
        console.log(err)
    })
})
//virtual field
UserSchema.virtual("confirmPassword")
    .get(()=>this._confirmPassword)
    .set((value)=>this._confirmPassword = value)

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match!")
        console.log("Passwords don't match!")
    }
    next();
});

const User = mongoose.model('User',UserSchema)
module.exports = User;