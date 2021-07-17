import { getInstance } from "../Axios/AxiosInstance"


export const getAllAuthors = ()=>{
  return getInstance(true).get('/api/authors')
}