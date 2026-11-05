import { useState } from 'react'
import QuizCreate from '../quiz-create/QuizCreate'
import QuizView from '../quizview/QuizView'
import { useSubmitQuiz } from '../../../hooks/useSubmitQuiz'

function QuizBuilder() {
  const [quiz, setQuiz] = useState(null)
  const [quizKey, setQuizKey] = useState(0)
  const { result, loading, error, submit, reset } = useSubmitQuiz()

  const handleGenerate = (newQuiz) => {
    reset()
    setQuiz(newQuiz)
    setQuizKey((k) => k + 1)
  }

  const handleClear = () => {
    reset()
    setQuiz(null)
  }


  const handleFinish = (answers) => submit({ quizId: quiz.id, answers })

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      <QuizCreate onGenerate={handleGenerate} onClear={handleClear} />
      <QuizView
        key={quizKey}
        quiz={quiz}
        submission={{ result, loading, error }}
        onFinish={handleFinish}
        onRestart={reset}
      />
    </div>
  )
}

export default QuizBuilder