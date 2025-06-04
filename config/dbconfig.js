import mongoose from "mongoose";


const DbCon=async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log(`mongo db is connected with cluster ${process.env.MONGODB_URL}`)
    } catch (error) {
        console.log(error)
    }
}

export default DbCon