const express = require('express')
const app = express()
const { syncModels } = require('./models')
const { PORT, TESTING } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')
const loginRouter = require('./controllers/login')
const resetRouter = require('./controllers/reset')


app.use(express.json())
app.use('/api/authors', authorsRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
console.log('TESTING:', TESTING) // Dodajemy logowanie TESTING
if (TESTING) {
  app.use('/api/reset', resetRouter)
}


app.get('/', (req, res) => {
  res.sendStatus(200)
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler) // must be last loaded middleware

const start = async () => {
  await connectToDatabase()
  await syncModels()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()