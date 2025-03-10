import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db.connect.js'
config()
connectDB()
const app = express()
import officialRoutes from './routes/official.routes.js'
import userRoutes from './routes/user.routes.js'
import landRoutes from './routes/land.routes.js'
const PORT = 8080
app.use(express.json())
app.use(cors({credentials: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.use("/api/official", officialRoutes);
app.use("/api/user", userRoutes);
app.use("/api/land", landRoutes);

try {
    app.listen(PORT)
    console.log("listning to port : ", PORT)
} catch (error) {
    console.log(err)
    res.send(err)
}

