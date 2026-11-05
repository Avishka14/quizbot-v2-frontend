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

  console.log('Submitting quiz result:', { quizId, answers })

  const payload = {
    quizId,
    questionsDTOS: answers.map(({ questionId, userAnswer , correctAnswer}) => ({
      questionId,
      correctAnswer,
      userAnswer,
    })),
  }

  const res = await api.post('/quiz/getmarks', payload)
  return res.data
}

export const getQuizHistory = async () => {
  const res = await api.get('/quiz/quiz-history') 
  return res.data
}