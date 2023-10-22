const mongoose = require("mongoose");
const mongoUri = "mongodb://127.0.0.1:27017/TodoList";
mongoose.set('strictQuery', false);

mongoose.connect(mongoUri, {useNewUrlParser: true})
  .then(() => {
    console.log("db connencted")
  })
  .catch((error) => {
    console.log(error);
  })

const db = mongoose.connect;

module.exports = db