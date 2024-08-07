const {Router}  = require('express');
const router = Router();
const User = require('../models/user');


router.get('/signin',(req,res) =>{
    return res.render('signin');
})
router.get('/signup',(req,res) =>{
    return res.render('signup');
});


router.post('/signin', async (req,res) =>{
    const {email,password}  = req.body;
    const user = await User.matchPasswordAndGenerateToken(email,password);
    console.log(user);
    return res.redirect('/');
})

router.post('/signup',async (req,res) =>{
    const {fullName,email,password} = req.body;
    const user = await User.create({
        fullName,
        email,
        password
    });
    console.log(user);
    res.redirect('/');
})


module.exports = router;