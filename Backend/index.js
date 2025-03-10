import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db.connect.js'
config()
connectDB()
const app = express()
import user from './models/user.model.js'
import official from './models/official.model.js'
import officialRoutes from './routes/official.routes.js'
import userRoutes from './routes/user.routes.js'
const PORT = 8080
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.use("/api/official", officialRoutes);
app.use("/api/user", userRoutes);

try {
    console.log(PORT)
    app.listen(PORT)
    console.log("listning to port : ", PORT)
} catch (error) {
    console.log(err)
    res.send(err)
}

