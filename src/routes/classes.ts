import { Router } from 'express'
const route = Router()
import { Classes } from '../services/classes'
import { schema_validation } from '../middlewares/data_validation'
import { schemaId,schemaClass } from '../schemas/index'
import { Request,Response,Next } from '../types/index'

route.get('/',async (req:Request,res:Response,next:Next) => {
  let classes : Array<object>
  let filter : object
  const { query } = req
  try 
  {
    filter = query
    classes = await new Classes().getAll(filter)
    return res.status(200).json({
      data : classes
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.post('/',
schema_validation(schemaClass),
async (req:Request,res:Response,next:Next) => {
  let { body } = req
  let classAdded : object
  try 
  {  
    classAdded = await new Classes().create(body)
    res.status(201).json({
      data : classAdded
      
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
  let classRemoved : object
  const { id } = req.params
  try 
  {
    classRemoved = await new Classes().delete(id)
    res.status(200).json({
      data : {
        classRemoved
      }
    })
  }
  catch(e)
  {
    next(e)
  }
})

export default route