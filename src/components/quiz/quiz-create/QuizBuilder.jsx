import { useState } from 'react'
import QuizCreate from '../quiz-create/QuizCreate'
import QuizView from '../quizview/QuizView'

function QuizBuilder() {
  const [quiz, setQuiz] = useState(null)
  const [quizId, setQuizId] = useState(0)

  const handleGenerate = (newQuiz) => {
    console.log('2. QuizBuilder got:', newQuiz)
    setQuiz(newQuiz)
    setQuizId((id) => id + 1) // new key = QuizView remounts with fresh state
  }

  const handleClear = () => setQuiz(null)

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      <QuizCreate onGenerate={handleGenerate} onClear={handleClear} />
      <QuizView key={quizId} quiz={quiz} />
    </div>
  )
}

export default QuizBuilder