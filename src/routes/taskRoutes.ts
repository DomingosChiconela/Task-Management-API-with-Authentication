
import  express from "express"
import { createTask, deleteTask, getTask, updateTask } from "../controllers/taskController"
import { AuthMiddleware } from "../middlewares/authMiddleware"





export const  taskRoute =  express.Router()

taskRoute.post("/",AuthMiddleware,createTask)
taskRoute.get("/",AuthMiddleware,getTask)
taskRoute.put("/:id",AuthMiddleware,updateTask)
taskRoute.delete("/:id",AuthMiddleware,deleteTask)












