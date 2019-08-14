import { MongoClient } from 'mongodb'
import { config } from '../config/index'
import chalk from 'chalk'
import { instanceDb,interfaceGet,interfaceCreate,interfaceDelete,interfaceUpdate,interfaceProyection } from './types'


const MONGO_URI = `mongodb://${config.pro.DB_USER}:${config.pro.DB_PASSWORD}@${config.pro.DB_HOST}:${config.pro.DB_PORT}/?authSource=${config.pro.DB_NAME}`
let INSTANCE_CONNECTION : instanceDb

const setupConnect = async () => {
  let client : any 
  try 
  {
    if(INSTANCE_CONNECTION)  return INSTANCE_CONNECTION
    
    client = await MongoClient.connect(MONGO_URI,{useNewUrlParser : true})
    INSTANCE_CONNECTION = await client.db(config.pro.DB_NAME)
    console.log(chalk.bgGreen('CONNECT SUCCESFUL'))
  }
  catch(e)
  {
    console.log(chalk.bgRed(e.name))
    process.exit(1)
  }

  return INSTANCE_CONNECTION
}

export const GET_ALL =  async(params : interfaceGet) => {
  let elements : Array<object>
  let db : any

  db = await setupConnect()
  elements = await db.collection(params.collection).find(params.filter).toArray()

  return elements
}


export const GET_ONE =  async(params : interfaceGet) => {
  let element : object
  let db : any

  db = await setupConnect()
  element = await db.collection(params.collection).findOne(params.filter)

  return element
}

export const GET_ONE_WITH_PROYECTION =  async(params : interfaceProyection) => {
  let element : object
  let db : any
  db = await setupConnect()
  element = await db.collection(params.collection).findOne(params.filter,params.proyection)

  return element
}

export const CREATE =  async(params : interfaceCreate) => {
  let element : object | any
  let db : any

  db = await setupConnect()
  element = await db.collection(params.collection).insertOne(params.input)
 
  return element.ops[0]
}

export const UPDATE =  async(params : interfaceUpdate) => {
  let element : object | any
  let db : any

  db = await setupConnect()
  element = await db.collection(params.collection).findOneAndUpdate(params.filter,params.query)
  return element.value
}

export const DELETE =  async(params : interfaceDelete) => {
  let element : object | any
  let db : any

  db = await setupConnect()
  element = await db.collection(params.collection).findOneAndDelete(params.filter)

  return element.value._id
}

