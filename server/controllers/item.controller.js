
const {User} = require('../database-mongo/Item.model.js');
const {Todo}= require('../database-mongo/Item.model.js');

const selectAll = async (req,res)=>{
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const todos = await Todo.find({ owner: user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
}

const postOwner = async (req,res)=>{
    try {
        const user = await User.create({name:req.body.name,password:req.body.password})
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error)
    }
}

const postTodo = async (req,res)=>{
  try {
    const  userId  = req.params.id;
    const { name, description, completed, type } = req.body
    const user = await User.findById(userId)
    const todo = new Todo({
      name,
      description,
      completed:false,
      type,
      owner: user._id
    });
    await todo.save()
    user.todos.push(todo)
    await user.save();
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateTodo = async function (req, res) {
  try {
    const { userId, todoId } = req.params;
    const user = await User.findById(userId)
    const todo = await Todo.findById(todoId)
    if (!user.todos.includes(todo._id)) {
      return res.status(403).json({ error: 'Todo does not belong to the user' })
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo.completed);
  } catch (error) {
    res.status(500).json('Internal server error')
  }
  }

  const deleteTodo = async function (req, res) {
    try {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const user = await User.findById(userId)
    const todo = await Todo.findById(todoId)
    if (!user.todos.includes(todo._id)) {
      return res.status(403).json({ error: 'Todo does not belong to the user' });
    }
    await todo.remove();
    user.todos.pull(todo._id);
    await user.save();
    res.json('Todo deleted successfully');
  } catch (error) {
    res.status(500).json(error);
  }
  }
  const getOwner = async (req,res)=>{
    try {
      const user = await User.findOne({name:req.body.name,password:req.body.password});
      console.log(user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

module.exports = { selectAll , postOwner,postTodo,deleteTodo,updateTodo,getOwner};
