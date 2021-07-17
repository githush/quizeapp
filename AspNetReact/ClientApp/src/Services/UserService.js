import { getInstance } from "../Axios/AxiosInstance"

export const getAllUsers = ()=>{
  return getInstance(true).get(`/api/users`)
}

export const lockUsersProfile = (id)=>{
  return getInstance(true).put(`/api/account/LockUserProfile/${id}`)
}