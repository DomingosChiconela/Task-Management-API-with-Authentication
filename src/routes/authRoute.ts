
import  express from "express"

import { register,login, verifyT} from "../controllers/authController"




export const  authRoute =  express.Router()

authRoute.post("/register",register)
authRoute.post("/login",login)
authRoute.post("/verify",verifyT)












