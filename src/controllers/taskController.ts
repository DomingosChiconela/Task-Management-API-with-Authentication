import { Request,Response} from "express";


import { date, z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"




const taskSchema  = z.object({

    title :z.string(), 
    description:z.string(),
    due_date: z.date().refine(date => date > new Date(), {
    message: "A data de vencimento deve ser uma data futura", 
  }),

})

const updateTaskSchema = taskSchema.partial();


export const createTask = async (req: Request, res: Response) => {

    const {userId}= req

  try {
    

      const validation = taskSchema.safeParse(req.body);
      if (!validation.success) {
          return res.status(400).json({ message: fromZodError(validation.error).details })
      }

      const newPost = await db.task.create({
          data: {
              title:validation.data.title,
              description:validation.data.description,
              due_date:validation.data.due_date,
              userId
          }
          
      })
      

      res.status(201).json({ message: "Post created", data: newPost })
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" });

  }


}


export const getTask  = async (req: Request, res: Response)=>{

    const {userId}= req

    try {
  
        const tasks = await db.task.findMany({
            where:{
                userId
            }
            
        })
        
        res.status(200).json({ message: "tasks found", data: tasks })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
  
    }


}

export  const updateTask = async (req:Request,res:Response)=>{
    const {userId}= req
    const  {id} = req.params

    const validation = updateTaskSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ message: fromZodError(validation.error).details });
    }


    const existingTask = await db.task.findUnique({
        where: { id }
    });

    

    if (!existingTask) {
        return res.status(404).json({ message: "Post not found" });
    }

    if(existingTask.userId !== userId){
        return res.status(403).json({ message: "Access denied. You are not the owner of this task." });
    }

    const dataToUpdate = Object.fromEntries(
        Object.entries(validation.data).filter(([_, value]) => value !== undefined && value !== null)
    );


    const updatedTask  = await db.task.update({
        where:{ id},
        data:dataToUpdate,
       
    })

    res.status(200).json({ message: "Task updated", data: updatedTask });



    


}