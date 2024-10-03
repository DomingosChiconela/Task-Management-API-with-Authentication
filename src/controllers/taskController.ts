import { Request,Response} from "express";


import { date, z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"




const taskSchema  = z.object({

    title :z.string(), 
  description:z.string(),
  due_date:z.string(),

})

const updateTaskSchema = taskSchema.partial();


export const createTask = async (req: Request, res: Response) => {

    

}
