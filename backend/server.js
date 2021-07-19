import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

//morgan middleware (using in dev mode; we can use it in production mode as well)
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.use(express.json())       //allows us to accept json data in body and we can access the data from req.body

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)


//fetch paypal client id in frontend using this route
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


/*
Static files are typically files such as scripts, CSS files, images, etc.
that aren't server-generated, but must be sent to the browser when requested.
If node.js is your web server, it does not serve any static files by default,
you must configure it to serve the static content you want it to serve.
*/

//make uploads folder static; see article 12.7 @ 12:00
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


//when we deploy our app; for more info see article 14.1
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))               //make frontend/build a static folder

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))

} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}


//handling 404 page errors
app.use(notFound)

//error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))