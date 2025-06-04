import mongoose from "mongoose";

const bookSechmea= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
    },
    pages:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // assuming your user model is called 'User'
        required: true
    }

},{timestamps:true})


const bookModel= mongoose.model('books',bookSechmea)


export default bookModel