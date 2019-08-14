import { GET_ALL,CREATE,DELETE } from '../lib/db'
import { ObjectId } from 'mongodb'

interface interfaceFilters {
  name ? : string | any
}

export class Classes 
{
  private collection : string

  constructor()
  {
    this.collection = 'classes'
  }

  async getAll(filters : interfaceFilters ) 
  {
    let classes : Array<object>
    let filter : object | any

    if(Object.keys(filters).length)
    {
     filter =  { name  : new RegExp(filters.name || false,'i')  }
    }

    classes = await GET_ALL({ 
      collection : this.collection,
      filter
    })

    return classes || []
  }

  async create(input : object) 
  {
    let classCreated : object

    classCreated = await CREATE({
      collection : this.collection,
      input
    })

    return classCreated 
  }

  async delete(id : string) 
  {
    let classRemoved : object
    const filter = {_id : new ObjectId(id) }

    classRemoved = await DELETE({
      collection : this.collection,
      filter
    })

    return classRemoved 
  }
  

}