const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
const Port=5000
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/Todo")
.then(()=>console.log("mongodb connect"))
.catch(err=>console.log(err))
const TodoSchema=new mongoose.Schema({
    title:{
        type:String,required:true
    },
    complete:{
        type:Boolean,
        default:false
    }
})
const TodoModel=mongoose.model("Todo",TodoSchema)
app.get("/api/Todo",async(req,res)=>{
    try {
        const Todo=await TodoModel.find()
        res.status(201).json(Todo)
    } catch (error) {
        res.status(500).json({message:"Todo not get",error})
    }
})
app.post("/api/Todo",async(req,res)=>{
    try {
        const{title}=req.body
        if(!title){
           return res.status(400).json({message:"Title Not Found"})
        }
        const NewTodo=new TodoModel({
            title
        })
        await NewTodo.save()
        res.status(201).json(NewTodo,{message:"Todo create successfully"})
    } catch (error) {
        res.status(500).json({message:"Todo not create successfully"},error)
    }
})
app.patch("/api/Todo/:id",async(req,res)=>{
    try {
        const UpdateTodo=await TodoModel.findByIdAndUpdate(req.params.id,{title:req.body.title},{new:true})
        res.status(201).json(UpdateTodo,{message:"update successfully"})
        
    } catch (error) {
        res.status(500).json({message:"update Not Successfully"})
    }
})
app.delete("/api/Todo/:id",async(req,res)=>{
   try {
    const delTodo= await TodoModel.findByIdAndDelete(req.params.id)
    res.status(201).json({message:"delete successfully"})
   } catch (error) {
     res.status(500).json(error,{message:"delete not successfully"})
   }
})





app.listen(Port,()=>{
    console.log(`server is running ${Port}`)
})