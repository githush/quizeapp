import { getInstance } from "../Axios/AxiosInstance"


export const updateProfile = (data)=>{
  return getInstance(true).put('/api/account/updateprofile', data)
}


export const getProfileInfo = ()=>{
  return getInstance(true).get('/api/account/getprofileinfo')
}


export const deleteAccount = ()=>{
  return getInstance(true).delete('/api/account/delete')
}

