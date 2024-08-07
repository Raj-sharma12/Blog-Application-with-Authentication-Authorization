const express=require('express');
const path=require('path');
const app= express();
const userRoute = require('./routes/user');
const port = 8000;
const {connectDB}  =require('./config/database');



connectDB();

app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set('views', path.resolve('./views'));
app.get('/',(req,res) =>{
    res.render('home');
})
app.use('/user',userRoute);
app.listen(port,() =>{
    console.log(`server started at port no.${port}`);
})