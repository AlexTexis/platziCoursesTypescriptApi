import { GET_ALL, GET_ONE,CREATE,DELETE,UPDATE } from '../lib/db'
import { ObjectId } from 'mongodb'

interface interfaceFilters {
  name : string | any
}

interface interfaceUpdate {
  id : string,
  input : object
}

export class Students 
{
  private collection : string

  constructor()
  {
    this.collection = 'students'
  }

  async getAll(filters : interfaceFilters) 
  {
    let students : Array<object>
    let filter : object | any
    
    if(Object.keys(filters).length)
    {
     filter =  { name  : new RegExp(filters.name || false,'i')  }
    }

    students = await GET_ALL({ 
      collection : this.collection,
      filter
    })

    return students || []
  }

  async getOne(id : string) 
  {
    let student : object
    const filter = { _id : new ObjectId(id) }

    student = await GET_ONE({ 
      collection : this.collection,
      filter
    })

    return student
  }

  async create(input : object) 
  {
    let studentCreated : object

    studentCreated = await CREATE({
      collection : this.collection,
      input
    })

    return studentCreated 
  }

  async delete(id : string) 
  {
    let studentRemoved : object
    const filter = {_id : new ObjectId(id) }

    studentRemoved = await DELETE({
      collection : this.collection,
      filter
    })

    return studentRemoved 
  }

  async update(params : interfaceUpdate) 
  {
    let studentUpdated : object
    const query = { $set : params.input } 
    const filter = { _id: new ObjectId(params.id) } 

    studentUpdated = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    return studentUpdated
  }
}
