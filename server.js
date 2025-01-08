const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const User=require('./src/Models/streamModel')
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://udaykirandevarasetti:7mnfTDbEPWLlgADJ@udaykiran.fjbos.mongodb.net/?retryWrites=true&w=majority&appName=streamora").then(()=>{
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

app.delete("/api/streamora/user/:id",async(req,res)=>{
    console.log(req.params)
    await User.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status:"success",
        data:null
    })
})

app.patch("/api/streamora/user/:id",async(req,res)=>{
    const user = await User.findByIdAndUpdate(
    req.params.id , 
        req.body ,
        {new:true}        
          
      );
    res.status(200).json({
        status:"success",
        user
    })
})

app.listen(4000,()=>{
    console.log("server has started")
})