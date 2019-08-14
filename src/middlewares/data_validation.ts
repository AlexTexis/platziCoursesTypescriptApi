import Joi from '@hapi/joi'
import Boom from '@hapi/boom'
import {  Request,Response,Next} from '../types/index'

const validation = (input : object,schema : object) => {
  const { error } = Joi.validate(input,schema)
  return error
}

export const schema_validation = (schema : object,check : string = 'body') => {
  return (req:Request | any,res:Response,next:Next) => {
    const error : any = validation(req[check],schema)
    error ? next(Boom.badRequest(error)) : next()
  }
}