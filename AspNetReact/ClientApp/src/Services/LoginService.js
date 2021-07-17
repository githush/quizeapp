import { getInstance } from "../Axios/AxiosInstance"

export const adminLogin = (data)=>{
  return getInstance().post('/api/account/adminlogin', data)
}

export const login = (data)=>{
  return getInstance().post('/api/account/login', data)
}
