import express from 'express'
import color from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRouters from './routers/authRouters.js'
import categoryRouters from './routers/categoryRouters.js'
import cors from 'cors'
import productRouters from './routers/productRouters.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth',authRouters)
app.use('/api/v1/category',categoryRouters)
app.use("/api/v1/product", productRouters);


app.get('/',(req,res)=>{
  res.send("<h1>Welcome to E-commerce Website</h1>")
})

const port = process.env.PORT || 8080

app.listen(port,()=>console.log(`Server is started at port ${port}`.bgGreen.white))