const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    unique:true
  },
  password : {
    type:String,
    unique:true
  },
  todos:[{
    type: mongoose.Types.ObjectId, ref: "Todo"
  }]
});

const User = mongoose.model("User", UserSchema);

const TodoSchema = new mongoose.Schema({
  name : String,
  description: String,
  completed : Boolean,
  type: {
    type: String,
    enum: ['weekly', 'daily']
  },
  owner : {type: mongoose.Types.ObjectId, ref: "User", required: true}
}
)
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {User,Todo};