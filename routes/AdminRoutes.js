import express from 'express'
import { Getuser, deletUser, getUserbyID, updateUserRole } from '../controllers/Admin.js'
import { isAdmin } from '../middleware/verifytoken.js'



const AdminRoutes=express.Router()
 AdminRoutes.get('/getuser',isAdmin,Getuser)
 AdminRoutes.delete('/delet/:id',isAdmin,deletUser)
 AdminRoutes.get('/getuserbyid/:id',isAdmin,getUserbyID)
 AdminRoutes.post('/updaterole/:id',isAdmin,updateUserRole)


export default AdminRoutes