import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db.connect.js'
config()
connectDB()
const app = express()
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
    app.listen(PORT)
    console.log("listning to port : ", PORT)
} catch (error) {
    console.log(err)
    res.send(err)
}

