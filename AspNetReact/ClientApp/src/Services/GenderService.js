import { getInstance } from "../Axios/AxiosInstance"

export const getAllGenders = ()=>{
  return getInstance(true).get('/api/genders')
}