import mongoose from "mongoose"

export const MongoDbConnnection  = (url:string)=>{
    return mongoose.connect(url)
}