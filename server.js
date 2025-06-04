
import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const PORT=process.env.PORT || 3000
const app = express();
DbCon()
app.use(express.json())
app.use(cookieParser())


// import prodRoute from './routes/productsRoute.js'
import AuthRoutes from "./routes/AuthRoutes.js";
import DbCon from "./config/dbconfig.js";
import cookieParser from "cookie-parser";
import AdminRoutes from "./routes/AdminRoutes.js";
import bookroutes from "./routes/BooksRoutes.js";
// app.use("/api/v1/products", prodRoute)
app.use("/api/auth", AuthRoutes)
app.use("/api/admin", AdminRoutes)
app.use("/api/books", bookroutes) 



app.listen(PORT, () => {
    console.log(`Express server is listning on ${PORT} ===> http://localhost:${PORT}/api`);
});   