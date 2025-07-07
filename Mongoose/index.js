const express=require("express")
const connection=require("./config/db")
const server =express()
const PORT=3002
server.listen(PORT,async()=>{
    await connection
    console.log("database is connecting")
    console.log(`server is running ${PORT}`)
})