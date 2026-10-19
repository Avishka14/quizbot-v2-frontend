import api from './axios' 

export const generateQuiz = async ({ topic, difficulty, count }) => {
  const payload = {
    topic,
    difficulty: difficulty.toUpperCase(), 
    questionCount: count,                
  }

  const res = await api.post('/quiz/getquiz', payload)
  return res.data
}