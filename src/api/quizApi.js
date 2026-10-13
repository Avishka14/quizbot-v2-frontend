import api from './axios' 

export const generateQuiz = async ({ topic, difficulty, count }) => {
  const payload = {
    topic,
    difficulty: difficulty.toUpperCase(), 
    questionCount: count,                
  }

  const { data } = await api.post('/quiz/getquiz', payload)
  return data
}