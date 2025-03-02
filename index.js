const express = require('express');
 const  cors=require('cors')
// require('./db/connect');

const user = require('./db/model');
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
const mongoose = require('mongoose');
require('dotenv').config(); 
const con=mongoose.connect('mongodb+srv://websitesudharo:1ox6G2TydUsezmiy@contactcrud.vlqhn.mongodb.net/?retryWrites=true&w=majority&appName=contactCrud',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});

async function calldata(data) {
    try {
        const newUser = new user(data);
        const result = await newUser.save();
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}
app.get('/read', async (req, res) => {
    try {
        const records = await user.find(); // Await the find operation
        console.log(records);
        res.status(200).json(records); // Send the records as a response
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error retrieving data' }); // Handle errors
    }
});
app.post('/create', async (req, res) => {
    try {
        const { name, email, number } = req.body;

        if (!name || !email || !number) {
            return res.status(400).json({ message: 'Name, email, and age are required.' });
        }
        const exist=await user.findOne({email}) ;
        if(exist){
        console.log("Mil gya database me ");
        res.status(500).json({message:"Already exist"})
        }
        else{
        await calldata(req.body); // Await the calldata function
        res.status(200).json({ message: 'Hello World', data: req.body }); // Send response
    }} catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error saving data' }); // Handle errors
    }
});
app.post('/getSpecific' ,async (req,res)=>{
   console.log(req.body);
   try{
     let spec= await user.findOne({email:req.body.email});
    if(spec){
        res.status(200).json(spec)
    }
    else{
        res.status(400).json({message:"Email is not valid"})
    }
}
catch(e){
    console.log(e);
}
})
app.post('/update', async (req, res) => {
    try {
        // Find the user by email
        let updRec = await user.findOne({ email: req.body.email });
        
        // If the user exists, proceed to update
        if (updRec) {
            // Perform the update
            let rec = await user.updateOne(
                { email: req.body.email },
                { $set: { name: req.body.name, number: req.body.number } }
            );

            // Check if the update was successful
            if (rec.modifiedCount > 0) {
                console.log("update successfull");
                return res.status(200).json({ message: "Updated Successfully" });
            } else {
                return res.status(400).json({ message: "No changes made" });
            }
        } else {
            return res.status(404).json({ message: "Email is not valid" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "An error occurred, please try again later" });
    }
});

app.delete('/delete', async (req, res) => {
    try {
      const { email } = req.body;
  console.log(email);
      // Ensure email is provided
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      // Perform the delete operation
      let delRec = await user.deleteOne({ email });
  
      // Check if the deletion was successful
      if (delRec.deletedCount > 0) {
        res.status(200).json({ message: "Deleted Successfully" });
      } else {
        res.status(400).json({ message: "No user found with that email" });
      }
    } catch (e) {
      console.error(e); // Log the error for debugging
      return res.status(500).json({ message: "An error occurred, please try again later" });
    }
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});