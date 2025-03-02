const mongoose = require('mongoose');
require('dotenv').config(); 
const con=mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});




// 1ox6G2TydUsezmiy