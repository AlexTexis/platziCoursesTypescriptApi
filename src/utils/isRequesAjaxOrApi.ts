import { Request } from '../types/index'

export const isRequestAjaxOrApi = (req : Request) => {
  return req.xhr || !req.accepts('html')
}