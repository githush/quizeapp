import { getInstance } from "../Axios/AxiosInstance"

export const getRandQuote = ()=>{
  return getInstance(true).get('/api/quiz/rand')
}

export const sendAnswer = (data)=>{
  return getInstance(true).post('/api/quiz/answer', data)
}


export const sendAnswerBinary = (data)=>{
  return getInstance(true).post('/api/quiz/answerbinary', data)
}