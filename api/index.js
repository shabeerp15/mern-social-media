import express from 'express'
const app = express()
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import colors from 'colors'
import userRoute from './src/routes/users.js'
import authRoute from './src/routes/auth.js'
import postsRoute from './src/routes/posts.js'
import conversationsRoute from './src/routes/conversations.js'
import messagesRoute from './src/routes/messages.js'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

dotenv.config()

const mongoDB = process.env.MONGO_URL
mongoose.connect(
    mongoDB,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('Connected to MongoDB'.green.bold.underline)
    }
)

const __dirname = path.resolve()
app.use('/images', express.static(path.join(__dirname, 'public/images')))

// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        console.log(req.body.name)
        cb(null, file.originalname)
    },
})
const upload = multer({storage})

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.status(200).json('File uploaded successfully')
    } catch (error) {
        console.log(err)
    }
})

app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/posts', postsRoute)
app.use('/conversations', conversationsRoute)
app.use('/messages', messagesRoute)

const PORT = process.env.PORT || 3001
app.listen(
    PORT,
    console.log(`Server starting on port ${PORT}`.yellow.bold.underline)
)
