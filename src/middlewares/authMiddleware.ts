import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { db } from "../utils/db.server";





const secret  =  process.env.SECRET as string


 
type TokenPayload = {

    id:string,
    iat:number,
    exp:number,
    role: string

}
 
export const AuthMiddleware  =  async(req:Request,res:Response, next:NextFunction)=>{


     const  {authorization}  = req.headers
     
     if(!authorization){

        return res.status(401).json({message:"Token not provider"})
     }

     const [,token] = authorization.split(" ")

    try{

        const decode  =  verify(token,secret)

        const {id,role} =  decode as TokenPayload
        const user = await db.user.findUnique({ where:{id} });
        if (!user) {
          return res.status(401).json({ message: "Access denied.User not found" });
        }


        req.userId =  id;
        req.role  =  role

        next()

    }catch(error){

        return res.status(401).json({message:"Token not provider"})
    }



    
}


