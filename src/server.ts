import express,{ urlencoded }  from "express"
import * as dotenv  from "dotenv"
import cors from "cors"
import  swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger.json"

import { authRoute } from "./routes/authRoute"
import { taskRoute } from "./routes/taskRoute"

dotenv.config()
export const app  = express()

const port =  process.env.PORT||3000

app.use( express.json())
app.use(cors())
app.use(urlencoded({extended:true}))


app.use('/auth',authRoute);
app.use('/tasks',taskRoute);
app.use('/api/docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument) )



app.listen(port , ()=>{

    console.log(` servidor rodando em http://localhost:${port}`)
    
    
    })
    