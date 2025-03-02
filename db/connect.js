const mongoose = require('mongoose');
const con=mongoose.connect('mongodb://localhost:27017/PRactice',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});
