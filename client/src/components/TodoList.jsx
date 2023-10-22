import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TodoList = ({ todos, setTodos, user, setView, sortBy, bol, setBol }) => {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [type, setType] = useState("")
    const [click, setClick] = useState(false)

    useEffect(() => {
        let isMounted = true;
        addTodo(name, desc, type, user._id)
        return () => {
            isMounted = false;
        };
    }, [click]);



    const addTodo = (name, desc, type, id) => {
        // Check if the user with the same name already exists in the database
        axios.get(`http://localhost:3000/api/users?name=${name}`)
            .then((response) => {
                if (response.data.length > 0) {
                    // User with the same name exists, show a message to the user
                    alert("User with the same name already exists");
                } else {
                    // User with the same name does not exist, proceed to add the todo
                    axios.post(`http://localhost:3000/api/todos/todo/${id}`, {
                        "name": name,
                        "description": desc,
                        "type": type
                    })
                        .then((response) => {
                            if (isMounted) {
                                setTodos(response.data);
                            }
                        })
                        .catch((error) => { console.log(error) });
                }
            })
            .catch((error) => { console.log(error) });
    };
    

    const deleteTodo = (userId, todoId) => {
        axios.delete(`http://localhost:3000/api/todos/${userId}/${todoId}`)
            .then((response) => console.log(response.data))
            .catch((err) => console.log(err))
    }

    const toggle = (userId, todoId) => {
        axios.patch(`http://localhost:3000/api/todos/${userId}/${todoId}`)
            .then((response) => console.log(response.data))
            .catch((err) => console.log(err))
    }


    return (
        <div>
            <div className='btn_'><button className="btn" onClick={() => { setView("home") }}> SIGN OUT</button></div>
            <section className="section_form">
                <form id="consultation-form" className="feed-form" action="#">
                    <input required placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                    <input className="phone" required placeholder="decription" onChange={(e) => setDesc(e.target.value)} />
                    {/* <input className="email" required placeholder="type (weekly or daily)" type="text" onChange={(e)=>setType(e.target.value)} /> */}
                    <select name="type" className="email" onChange={(e)=>setType(e.target.value)}>
                        <option value="weekly">weekly</option>
                        <option value="daily">daily</option>
                    </select>
                    <button className="button_submit" onClick={(e) => { e.preventDefault(); setClick(!click); setBol(!bol) }}>POST</button>
                </form>
                <div className='allSort'>
                    <div className='btn1' ><button className="sortBtn" onClick={() => { sortBy("all"); setBol(!bol) }}>ALL TODOS</button></div>
                    <div className='btn1' ><button className="sortBtn" onClick={() => { sortBy("weekly"); setBol(!bol) }}>WEEKLY</button></div>
                    <div className='btn1' ><button className="sortBtn" onClick={() => { sortBy("daily"); setBol(!bol) }}>DAILY</button></div>
                </div>
            </section>
            {todos.map((todo) => {
                return (
                    <div className="card">
                        <div className="tools">
                            <div className="circle">
                                <span className="red box" onClick={() => { deleteTodo(user._id, todo._id) }}  ></span>
                            </div>
                            <div className="circle">
                                <span className="yellow box"></span>
                            </div>
                            <div className="circle">
                                <span className="green box" onClick={() => { toggle(user._id, todo._id) }} ></span>
                            </div>
                        </div>
                        <div className="card__content">
                            <h1 className='todo'>{todo.name}</h1>
                            <h2 className='todo'>{todo.description}</h2>
                            <h3 className='type'>{todo.type}</h3><p className='done'>{todo.completed ? "done" : "not yet"}</p>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default TodoList