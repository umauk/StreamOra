const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const User=require('./src/Models/streamModel')
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://rajeshtanni2001:njfCVdf70ODK7j57@rajesh.7pfdg.mongodb.net/Stream").then(()=>{
    console.log("connected to database")
})


app.post("/api/streamora/user",async(req,res)=>{
   const user=await User.create(req.body)
   res.status(200).json({
    status:'success',
    data:{
        user
    }
   })
})

app.get("/api/streamora/user",async(req,res)=>{
    const users=await User.find()
    res.status(200).json({
        status:'success',
        data:{
            users
        }
       })

})

app.delete("/api/streamora/user/:email",async(req,res)=>{
    console.log(req.params)
    await User.findOneAndDelete({email:req.params.email})
    res.status(204).json({
        status:"success",
        data:null
    })
})

app.patch("/api/streamora/user/:email",async(req,res)=>{
    const user = await User.findOneAndUpdate(
        { email: req.params.email }, 
        { $set: req.body },          
        { new: true } 
      );
    res.status(200).json({
        status:"success",
        user
    })
})

app.listen(4000,()=>{
    console.log("server has started")
})