import  jwt from 'jsonwebtoken'
import UserModel from '../models/users.js'


const isAdmin=async(req,res,next)=>{
    try {
         const token=req.cookies.token
         if (!token) {
            return res.status(401).json({messsage:"'Unauthorized: No token provided'"})
         }

         const decoded= jwt.verify(token,process.env.JWT_SECRETE)
         const user=await UserModel.findById(decoded.userId)
         if (!user) {
            return res.status(401).json({messsage:"'user not found'"})
         }

         if (user.role !=='admin') {
            return res.status(403).json({messsage:'Unauthorized: User is not an admin'})
         }
       req.user=user
         next()
      
    } catch (error) {
        console.log(error)
    }
}

const IsUser=async(req,res,next)=>{
   try {
      const token=req.cookies.token
      if (!token) {
         return res.status(401).json({messsage:"'Unauthorized: No token provided'"})
      }

      const decoded= jwt.verify(token,process.env.JWT_SECRETE)
      const user=await UserModel.findById(decoded.userId)
      if (!user) {
         return res.status(401).json({messsage:"'user not found'"})
      }

    
    req.user=user
      next()
   
 } catch (error) {
     console.log(error)
 }
}

import BookModel from '../models/books.js'; // adjust the path to your Book model

const isAuthorOfBook = async (req, res, next) => {
    try {
       const bookId = req.params.id; // Book ID from route
       const user = req.user; // Set by IsUser middleware
 
       const book = await BookModel.findById(bookId);
       if (!book) {
          return res.status(404).json({ message: 'Book not found' });
       }
 
       // ✅ Allow if user is admin
       if (user.role === 'admin') {
          req.book = book;
          return next();
       }
 
       // ✅ Allow if user is author *and* created the book
       if (user.role === 'author' && book.createdBy.toString() === user._id.toString()) {
          req.book = book;
          return next();
       }
 
       return res.status(403).json({ message: 'You are not authorized to modify this book' });
 
    } catch (error) {
       console.log(error);
       return res.status(500).json({ message: 'Internal server error' });
    }
 };

 // middleware/roleCheck.js
const allowNonReadersOnly = (req, res, next) => {
    const user = req.user;
 
    if (user.role === 'reader') {
       return res.status(403).json({ message: 'Access denied: Readers are not allowed to perform this action' });
    }
 
    next(); // Allow author or admin
 };
 
 


export {isAdmin,IsUser, isAuthorOfBook, allowNonReadersOnly};