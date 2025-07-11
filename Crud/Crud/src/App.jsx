import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
const [SearchQuery,setSearchQuery]=useState('')
const [Newtask,setNewTask]=useState('')
const [Todo,setTodos]=useState([])

useEffect(()=>{
    fetchTodos()
},[])
const fetchTodos=()=>{axios.get('http://localhost:5000/api/Todo')
.then(response=>{
  setTodos(response.data)
  
})
.catch(error=>console.log("error Fectching",error))
}
const EditTodo=(id)=>{
  const UpdateTitle=prompt("update todo")
  if(UpdateTitle){
    axios.patch(`http://localhost:5000/api/Todo/${id}`,{title:UpdateTitle})
    .then(response=>{
      console.log("responsepatch",response)
      setTodos(Todo.map(todos=>todos._id===id?response.data:todos))
    })
    .catch(error=>console.log("Error updating ",error))
  }
}
const deleteTodo=(id)=>{
  axios.delete(`http://localhost:5000/api/Todo/${id}`)
  .then(()=>setTodos(Todo.filter(todo=>todo._id!==id)))
  .catch(error=>console.log("Error deleting Todo",error))
}
const addTodo=(e)=>{
e.preventDefault()
if(Newtask.trim()){
   axios.post("http://localhost:5000/api/Todo",{title:Newtask})
   .then(response=>{
    console.log("postresponse",response)
     setTodos([...Todo,response.data])
     setNewTask('')
    }) 
    .catch(error=>console.log(error))
}
}
const SearchFilter=Todo.filter(todos=>todos.title.toLowerCase().includes(SearchQuery.toLowerCase()))
  return (
    <div className='app'>
      <h1>Crud App</h1>
   <input type="text" placeholder='enter your searchQuery' 
   value={SearchQuery} 
   onChange={(e)=>setSearchQuery(e.target.value)} 
   className="search-input"/>
   <form action="" onSubmit={addTodo} className='Todo-form'>
    <input type="text" placeholder='enter your task' value={Newtask}className="Todo-form-input" onChange={(e)=>setNewTask(e.target.value)}/>
    <button type="submit" className="search-input">Add Task</button>
   </form>
   <ul className='list'>
    {
      SearchFilter.map((todos)=>(
        <li className='Todo-item'>
         <span>{todos.title}</span> 
      <div>
      <button onClick={()=>EditTodo(todos._id)}>✏️</button>
      <button onClick={()=>deleteTodo(todos._id)}>🗑️</button>
      </div>
        </li>
      ))
    }
   </ul>
    </div>
  )
}

export default App
