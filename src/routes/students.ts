import { Router  } from 'express'
const route = Router()
import { Students } from '../services/students'
import { schema_validation } from '../middlewares/data_validation'
import { schemaId,schemaStudent,schemaStudentUpdate } from '../schemas/index'
import { Request,Response,Next } from '../types/index'

route.get('/',async (req:Request,res:Response,next:Next) => {
  let students : Array<object>
  let filter : object | any
  const { query } = req
  try 
  {
    filter = query
    students = await new Students().getAll(filter)
    return res.status(200).json({
      data : students
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.get('/:id',
schema_validation(schemaId,'params'),
async (req:Request,res:Response,next:Next) => {
  const { id } = req.params
  let student : object
  try 
  {
    student = await new Students().getOne(id)
    res.status(200).json({
      data :  student
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.post('/',
schema_validation(schemaStudent,'body'),
async (req:Request,res:Response,next:Next) => {
  let { body } = req
  let newStudent : object
 try 
 {  
  newStudent = await new Students().create(body)
  res.status(201).json({
    data : newStudent
  })
 }
 catch(e)
 {
   next(e)
 }
})

route.put('/:id',
schema_validation(schemaId,'params'),
schema_validation(schemaStudentUpdate,'body'),
async (req:Request,res:Response,next:Next) => {
  let updatedStudent : object
  const { body } = req
  const { id } = req.params
  try 
  {
    updatedStudent = await new Students().update({
      id,
      input : body
    })

    res.status(200).json({
      data : {...updatedStudent,...body}
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.delete('/:id',
schema_validation(schemaId,'params'),
async (req:Request,res:Response,next:Next) => {
  let studentRemoved : object
  const { id } = req.params
  try 
  {
    studentRemoved = await new Students().delete(id)
    res.status(200).json({
      data : { studentRemoved }
    })
  }
  catch(e)
  {
    next(e)
  }
})

export default route