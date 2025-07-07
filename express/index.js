const express=require("express")
const server=express()
const Port=3001
server.get("/",(req,res)=>{
    res.send("welcome to home page")
})
server.listen(Port,()=>{
    console.log("server is running")
})