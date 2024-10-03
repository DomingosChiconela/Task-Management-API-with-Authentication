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


