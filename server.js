const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./db')
const CourseRoute = require('./routes/CourseRoute')

const app = express()
const PORT = 4000

app.use(bodyParser.json())
app.use('/api/course', CourseRoute)

mongoose.connect(config.DB).then(
  () => console.log('Database is connected'),
  err => console.log(`Can not connect to the database ${err}`)
)

app.listen(PORT, () => console.log(`You node js server is running on PORT: ${PORT}`))
