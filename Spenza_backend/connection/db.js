import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


mongoose.set('strictQuery', false);

const Connection= async ()=>{
    
    try{
        await mongoose.connect(process.env.url,{useNewUrlParser:true})
        console.log("Database Connected Successfully")
    }catch(error){
        console.log("Error while connecting",error)
    }
}

export default Connection