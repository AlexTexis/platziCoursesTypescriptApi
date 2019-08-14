import { GET_ALL, GET_ONE,CREATE,DELETE,UPDATE,GET_ONE_WITH_PROYECTION } from '../lib/db'
import { ObjectId } from 'mongodb'

interface interfaceUpdate {
  id : string ,
  input : object
}

interface interfaceAddClass {
  idRef : string ,
  input : object | any
}

interface interfaceRemoveClass {
  idRef : string ,
  idClass : string
}

interface interfaceAddStudent {
  idRef : string ,
  idStudent : string 
}

interface interfaceRemoveStudent {
  idRef : string ,
  idStudent : string
}


export class Courses 
{
  private collection : string

  constructor()
  {
    this.collection = 'courses'
  }
  
  async getAll() 
  {
    let courses : Array<object>

    courses = await GET_ALL({ 
      collection : this.collection,
    })

    return courses || []
  }

  async getOne(id : string) 
  {
    let course : object

    const filter = { _id : new ObjectId(id) }

    course = await GET_ONE({ 
      collection : this.collection,
      filter
    })

    return course 
  }

  async create(input : object) 
  {
    let courseCreated : object

    courseCreated = await CREATE({
      collection : this.collection,
      input
    })

    return courseCreated 
  }

  async delete(id : string) 
  {
    let courseDeleted : object
    
    const filter = {_id : new ObjectId(id) }

    courseDeleted = await DELETE({
      collection : this.collection,
      filter
    })

    return courseDeleted 
  }

  async update(params : interfaceUpdate) 
  {
 
    let courseUpdated : object

    const query = { $set : params.input } 
    const filter = { _id: new ObjectId(params.id) } 

    courseUpdated = await UPDATE({
      collection : this.collection,
      query,
      filter
    })
    
    return courseUpdated 
  }

  
  async addClass(params : interfaceAddClass) 
  {
    let classAdd : object | any
    let response_projection : object

    const filter_class = { _id : new ObjectId(params.input._id) } 
    const proyection ={ _id : 1,name:1 }

    response_projection = await GET_ONE_WITH_PROYECTION({
      collection : 'classes',
      filter : filter_class,
      proyection
    })

    const filter = { _id : new ObjectId(params.idRef) }
    const query = { $addToSet : { class : response_projection } }

    classAdd = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    return {
      _id : classAdd['_id'],
      saved: response_projection
    } 
  }

  async removeClass(params : interfaceRemoveClass) 
  {
    let classRemoved : object | any

    const filter = { _id : new ObjectId(params.idRef) }
    const query = { $pull : { class : { _id : new ObjectId (params.idClass)} } }

    classRemoved = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    return {
      _id : classRemoved['_id'],
      removed : params.idClass
    } 
  }

  async addStudent(params : interfaceAddStudent) 
  {
    let studentAdd : object | any
    let response_proyection : object

    const filter_student = { _id :  new ObjectId(params.idStudent) }
    const proyection  = { projection : { _id : 1,name :1,surnames :1 } }
    
    response_proyection = await GET_ONE_WITH_PROYECTION({
      collection : 'students',
      filter : filter_student,
      proyection
    })


    const filter = { _id : new ObjectId(params.idRef) }
    const query = { $addToSet : { alumns : response_proyection} }

    studentAdd = await UPDATE({
      collection : this.collection,
      query,
      filter
    })
    
    return {
      _id : studentAdd['_id'],
      saved : response_proyection 
    }
  }

  async removeStudent(params : interfaceRemoveStudent) 
  {
    let response : object | any

    const filter = { _id : new ObjectId(params.idRef) }
    const query = { $pull : { alumns : { _id : new ObjectId( params.idStudent) } } }

    response = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    return {
      _id : response['_id'], //id reference (course)
      removed : params.idStudent
    } 
  }
}