import express from 'express'
import { createTodo, deleteTodo, getTodo, updateTodo } from '../Controllers/todoController.js';

const todoRouter = express.Router();

todoRouter.post("/create", createTodo)
todoRouter.get("/fetch", getTodo)
todoRouter.put("/update/:id", updateTodo)
todoRouter.delete("/delete/:id", deleteTodo)

export default todoRouter;