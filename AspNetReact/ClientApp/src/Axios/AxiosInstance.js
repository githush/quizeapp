import axios from "axios"

const baseURL = process.env.REACT_APP_HOSTNAME


export const getInstance = (isTokenRequired = false)=>{

  const headers = { }

  if(isTokenRequired && localStorage.token){
    headers.Authorization = `Bearer ${localStorage.token}`
  }

  const instance = axios.create({
    baseURL,
    headers
  })


  return instance;
}