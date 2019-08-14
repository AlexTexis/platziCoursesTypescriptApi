import { MongoClient } from 'mongodb'

export type instanceDb = MongoClient | object

type collection = string 
type filter = object
type input = object
type query = object
type proyection = object

export interface interfaceGet {
  collection : collection,
  filter ? : filter
}

export interface interfaceProyection {
  collection : collection,
  filter : filter,
  proyection : proyection
}

export interface interfaceCreate {
  collection : collection,
  input :  input
}

export interface interfaceUpdate{
  collection : collection,
  query : query,
  filter : filter
}

export interface interfaceDelete{
  collection : collection,
  filter : filter
}