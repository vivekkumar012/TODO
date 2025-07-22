import todoModel from "../Models/todoModel.js"

export const createTodo = async(req, res) => {
    const todo = new todoModel({
        text: req.body.text,
        completed: req.body.completed
    })

    try {
        const newTodo = await todo.save()
        res.status(200).json({
            message: "New Todo craeted",
            newTodo
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in todo creation",
            error: error.message
        })
    }
}

export const getTodo = async(req, res) => {
    try {
        const todos = await todoModel.find()
        res.status(200).json({
            message: "Todo fetched successfully",
            todos
        })
    } catch (error) {
        res.status(402).json({
            message: "Error in fetching all todos",
            error: error.message
        })
    }
}

export const updateTodo = async(req, res) => {
    try {
        const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json({
            message: "Todo Updated Successfully",
            todo
        })
    } catch (error) {
        res.status(402).json({
            message: "error in update todo",
            error: error.message
        })
    }
}

export const deleteTodo = async(req, res) => {
    try {
        const todo= await todoModel.findByIdAndDelete(req.params.id);
        if(!todo) {
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        res.status(200).json({
            message: "Todo delted Successfully"
        })
    } catch (error) {
        res.status(403).json({
            message: "Error in delete todo",
            error: error.message
        })
    }
}