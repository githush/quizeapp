import { getInstance } from "../Axios/AxiosInstance"

export const registerUser = (data)=>{
  return getInstance().post('/api/account/register', data)
} 