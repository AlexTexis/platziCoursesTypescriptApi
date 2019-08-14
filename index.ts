import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { Request,Response } from './src/types/index'

const app = express()

//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

//routes
import routeAlumns from './src/routes/students'
import routeCourses from './src/routes/courses'
import routeClasses from './src/routes/classes'

app.get('/',(req:Request,res:Response) => res.json({ message : 'welcome to api platzi courses with typescript'}))
app.use('/students',routeAlumns)
app.use('/courses',routeCourses)
app.use('/classes',routeClasses)


//errror middlewares
import { 
  log_errors,
  wrap_error,
  client_error,
  handler_error,
  not_found
 } from './src/middlewares/error'

 app.use(not_found)
 app.use(log_errors)
 app.use(wrap_error)
 app.use(client_error)
 app.use(handler_error)

//server init
const PORT = process.env.PORT || 8000
app.listen(PORT,() => console.log(`Server listen on :${PORT}`))
