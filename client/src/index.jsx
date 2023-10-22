import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/home.jsx'
import TodoList from './components/TodoList.jsx'
import axios from 'axios'

const App = () => {
const [user,setUser]=useState([])
const [todos,setTodos]=useState([])
const [view,setView]=useState("home","TodoList")
const [sorted,setSorted]=useState([])
const [bol,setBol]=useState(false)
const [change,setChange]=useState("all","weekly","daily")

useEffect(()=>{
  fetch(user._id)
  sortBy(change)
},[user,todos,bol])


  const sortBy=(str)=>{
    if(str === "weekly"){
      setChange("weekly")
      setSorted(todos.filter((todos)=>{
        return todos.type === "weekly"
      })
      )}else if(str === "daily"){
        setChange("daily")
        setSorted(todos.filter((todos)=>{
          return todos.type === "daily"
        })
        
        )}else if(str === "all"){
          setChange("all")
          setSorted(todos)
        }
  }

  const signUp = (name,password)=>{
    axios.post("http://localhost:3000/api/todos/user",
    {
      "name":name,
      "password":password
    })
    .then(()=>console.log("success"))
    .catch((error)=>console.log(error))
  }

  const login = (name,password)=>{
    axios.post("http://localhost:3000/api/todos/getUser/",{
      "name":name,
      "password":password
    })
    .then((resp)=>{setUser(resp.data);setView("TodoList")})
    .catch((error)=>console.log(error))
  }

  const fetch=(id)=>{
    axios.get(`http://localhost:3000/api/todos/${id}`)
  .then((response)=>{setTodos(response.data)})
  .catch((error)=>{console.log(error)})
  }

  const week = ()=>{
   const arr = todos.filter((todo)=>{
      return todo.type === "weekly"
    })
    setTodos(arr)
  }

  const day = ()=>{
    const arr = todos.filter((todo)=>{
       return todo.type === "daily"
     })
     setTodos(arr)
   }

  return (
    <div>
      {view==="home" ? <Home signUp={signUp}  login={login} /> : <TodoList sortBy={sortBy} todos={sorted} setTodos={setTodos} user={user} setView={setView} bol={bol}  setBol={setBol} /> }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
