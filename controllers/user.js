const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwtHandler = require('../utils/jwtHandler')
exports.registerUser = (req,res,next)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({email: req.body.email})
         .then(user => {
             if(user){
                const err=new Error("Email Address Already Exists.")
                err.statusCode=400
                throw err
             }  
                return bcrypt.genSalt(10)
            })
            .then(salt=>{
                    return bcrypt.hash(newUser.password,salt)
            })
            .then(hashed=>{
                newUser.password = hashed;
                return newUser.save()
            })
            .then(savedUser=>{
                res.json(savedUser)
            })
            .catch(err=>{
                next(err)
            })
    }

exports.loginUser = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;   
    var currentUser;
    User.findOne({email})
       .then(user => {
          if (!user) {
              const err=new Error("No Account Found")
              err.statusCode=404
              throw err
         }
         currentUser=user
        return bcrypt.compare(password, user.password)
        })
        .then(isMatch => {
            if(!isMatch){
                const err=new Error("Incorrect Password")
                err.statusCode=401
                throw err 
            }
            var token = jwtHandler.createTempJwtWithExpiry({
                id: currentUser._id,
                name: currentUser.name
            },'5s')
            res.json({ 
                success: true,
                token: `Bearer ${token}` ,
                user:currentUser
            })
        })
        .catch(err=>{
            next(err)
        })

}