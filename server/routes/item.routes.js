const router = require('express').Router();
const { selectAll , postOwner,postTodo,deleteTodo,updateTodo,getOwner} = require("../controllers/item.controller");
router.post("/getUser",getOwner);
router.get("/:id", selectAll);
router.post("/user", postOwner);
router.post("/todo/:id",postTodo);
router.delete("/:userId/:todoId",deleteTodo);
router.patch("/:userId/:todoId",updateTodo)


module.exports = router;
