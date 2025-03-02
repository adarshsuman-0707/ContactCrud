const mongoose = require('mongoose');
const con=mongoose.connect('mongodb+srv://websitesudharo:1ox6G2TydUsezmiy@contactcrud.vlqhn.mongodb.net/?retryWrites=true&w=majority&appName=contactCrud',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});




// 1ox6G2TydUsezmiy