
import  express from "express"

import { register,login, verify} from "../controllers/authController"




export const  authRoute =  express.Router()

authRoute.post("/register",register)
authRoute.post("/login",login)
authRoute.get("/verify",verify)












