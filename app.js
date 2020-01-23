const express = require('express')
const bodyparser = require('body-parser')
const path = require('path');
const userRouter = require('./routers/route')

const app = express()

const cors = require('cors')
app.use(cors())


//Mongoose is not used later on so its not in const mongoose
require('./db/mongoose')


app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())
app.use(userRouter)
app.listen(5000)

