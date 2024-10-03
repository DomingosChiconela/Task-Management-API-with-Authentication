import express,{ urlencoded }  from "express"
import * as dotenv  from "dotenv"
import cors from "cors"

dotenv.config()
const app  =   express()

const port =  process.env.PORT||3000

app.use( express.json())
app.use(cors())
app.use(urlencoded({extended:true}))









app.listen(port , ()=>{

    console.log(` servidor rodando em http://localhost:${port}`)
    
    
    })
    