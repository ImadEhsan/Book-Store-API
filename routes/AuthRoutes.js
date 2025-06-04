
import express from 'express'
import { CheckUser, login, logout, register, updateUser } from '../controllers/Auth.js'
import { IsUser } from '../middleware/verifytoken.js'
const AuthRoutes = express.Router()

AuthRoutes.post('/register', register)
AuthRoutes.post('/login', login)
AuthRoutes.post('/logout', logout)
AuthRoutes.put('/update/:id', updateUser)
AuthRoutes.get('/CheckUser', IsUser, CheckUser)

export default AuthRoutes