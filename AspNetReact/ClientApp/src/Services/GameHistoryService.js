import { getInstance } from "../Axios/AxiosInstance"


export const getGameHistory = (userId)=>{
  return getInstance(true).get(`/api/users/gamehistory/${userId}`)
}


