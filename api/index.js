const express=require("express")

const app=express()


app.get('/',(req,res)=>{
    req.send("hello....")
})

app.listen(3000,()=>{
    console.log("connected to server....");
})