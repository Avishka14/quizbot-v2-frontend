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


export const submitQuizResult = async ({ quizId, answers }) => {
  const payload = {
    quizId,
    questionsDTOS: answers.map(({ questionId, userAnswer }) => ({
      questionId,
      userAnswer,
    })),
  }

  const res = await api.post('/quiz/getmarks', payload)
  return res.data
}