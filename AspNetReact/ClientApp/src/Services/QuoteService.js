import { getInstance } from "../Axios/AxiosInstance"




export const getQuoteById = (id)=>{
  return getInstance(true).get(`/api/quotes/${id}`)
}

export const getAllQuotes = ()=>{
  return getInstance(true).get('/api/quotes')
}

export const deleteQuoteById = (id)=>{
  return getInstance(true).delete(`/api/quotes/${id}`)
}

export const updateQuote = (quote)=>{
  return getInstance(true).put(`/api/quotes`, quote)
}

export const addNewQuote = (quote)=>{
  return getInstance(true).post(`/api/quotes`, quote)
}
