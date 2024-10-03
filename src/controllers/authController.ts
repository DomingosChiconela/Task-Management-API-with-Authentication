import { Request,Response} from "express";
import { verify } from "jsonwebtoken";


import { date, z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"
import * as jwt from "jsonwebtoken"
;
import { encryptPassword,checkPassword } from "../utils/cryptPassword";

const secret  =  process.env.SECRET as string


 export const signupSchema = z.object({

    username: z.string(),
    email: z.string().email("Email is required").toLowerCase(),
    password: z.string().min(8, "The password must not be less than 8 characters"),
    confirmPassword: z.string().min(8, "The password must not be less than 8 characters")
    


})


const loginSchema = signupSchema.pick({
    username: true,
    password: true
  });


type TokenPayload = {

    id:string,
    iat:number,
    exp:number,
    role: string

}


  


export const register = async (req: Request, res: Response) => {
    console.log(req.body)

    try {
        
        const validation = signupSchema.safeParse(req.body);
        if(!validation.success){
            return  res.status(400).json({message:fromZodError(validation.error).details})
        }

        if(validation.data.password !== validation.data.confirmPassword){
           return res.status(400).json({message:"The passwords do not match"})
        }
        const passwordHash  =  await encryptPassword(validation.data.password)


        const existingUser = await db.user.findFirst({
            where: {
              OR: [
                { username: validation.data.username },
                { email: validation.data.email }
              ]
            }
          });
          
          if (existingUser) {
            
            if (existingUser.username === validation.data.username) {
              return res.status(400).json({ message: "The username already exists, please enter a new one" });
            }
          
           
            if (existingUser.email === validation.data.email) {
              return res.status(400).json({ message: "The email already exists, please enter a new one" });
            }
          }

        


       const  newUser =  await db.user.create({
        data:{
            username:validation.data.username,
            email:validation.data.email,
            password: passwordHash,
        },
        
       }
          
        )

        res.status(201).json({message:"user created "})
       


    } catch (error) {
        console.log(error)
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



export const login =  async (req: Request, res: Response) => {
    const validation = loginSchema.safeParse(req.body);

    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }
    try{
        const user = await db.user.findUnique({
            where:{
                username:validation.data.username
            },
    
          
        
        })

        if(!user){
            return  res.status(404).json({message:"user not found"})

        }
       
        if(! await checkPassword(validation.data.password,user?.password)){
            return  res.status(400).json({message:"invalid password"})
        }


        const token  =   jwt.sign({id:user.id, role:user.role},secret,{expiresIn:"30d"})

        res.status(200).json({message:"authenticated user",token})

    }catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
   

}


export const verifyT =  async(req: Request, res: Response)=>{

    
    const  {authorization}  = req.headers
     
    if(!authorization){

       return res.status(401).json({message:"Token not provider"})
    }

    const [,token] = authorization.split(" ")

    try{

        const decode  =  verify(token,secret)

        const {id} =  decode as TokenPayload

        const user = await  db.user.findUnique({

            where:{
                id
            },
            select:{
                id:true,
                username:true,
                email:true,
                role:true

            }
        })

        

        

        res.status(200).json({message:"user found",data:user})
      
    }catch(error){

        return res.status(500).json({message:"Internal Server Error"})
    }

}

  
  
  
  
  
  

