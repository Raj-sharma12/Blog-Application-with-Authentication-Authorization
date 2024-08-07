const mongoose=require('mongoose');

const connectDB  =() =>{
    mongoose.connect("mongodb://localhost:27017/BlogWebsite")
    .then(() =>{
        console.log("mongodb connected successfully!");
    })
    .catch((error) =>{
        console.log("mongodb facing errors!");
    })
}

module.exports = {connectDB};