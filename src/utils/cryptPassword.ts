import  bcrypt from "bcrypt"




export  const encryptPassword =  async(password:string)=>{

    const salt  =  await bcrypt.genSalt(12)
    const passwordHash =  await bcrypt.hash(password,salt)

    return passwordHash
}


export const checkPassword=  async(senderPassword:string,dbPassord:string)=>{


    return  await bcrypt.compare(senderPassword,dbPassord)

}