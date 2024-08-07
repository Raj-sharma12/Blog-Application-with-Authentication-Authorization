const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('node:crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema  = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:'../public/images/default.png'
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER",
    }

},{timestamps:true});


userSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')){
        return;
    }

    // create a salt
    // just like a secret key
    const salt= randomBytes(16);
    // create a hashed password
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');
     console.log(hashedPassword);
    this.salt = salt;
this.password = hashedPassword;
    next();
})

// logic for signin
userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user=await this.findOne({email});
    // if usernot find in db then show error user not found
    // if(!user){throw new error('User not found!');}
    console.log(user);
    // if user find then comapre user salt
    const salt=user.salt;
    const hashedPassword = user.password;

    // hash the user provided password
    const userProvidedHash  = createHmac('sha256',salt).update(user.password).digest('hex');
    // if(userProvidedHash!==hashedPassword) {
    //     throw new error("Password Incorrect!");
    // };
   
   const token = createTokenForUser(user);
})

const  User  = mongoose.model('user',userSchema);
module.exports = User;