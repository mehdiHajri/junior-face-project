const express = require("express");
const itemRoutes = require('./routes/item.routes')
const db = require('./database-mongo');
const app = express();
const PORT =  3000
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));
app.use(cors())

app.use("/api/todos", itemRoutes);
app.post("api/todos/",itemRoutes);
app.get("api/todos/",itemRoutes);
app.get("api/todos/",itemRoutes);
app.post("api/todos/",itemRoutes);
app.post("api/todos/",itemRoutes);
app.delete("api/todos/",itemRoutes);
app.patch("api/todos/",itemRoutes);



app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});
