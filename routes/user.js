const router = require('express').Router()
const userController = require('../controllers/user')
const passport = require('passport');

router.get('/auth/facebook',passport.authenticate('facebook'));

router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/users/passport/failure' }),
  function(req, res) {
    res.redirect('/users/passport/success');
  });

router.get('/passport/failure',(req,res,next)=>{
    res.status(401).json({
        message:"Login Failed",
    })
})

router.get('/passport/success',(req,res,next)=>{
    res.json({
        message:"Login Successfull",
    })
})

router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser)
router.get('/profile',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
    res.json({
        "message":"profile",
        profile:req.user
    })
})

module.exports = router