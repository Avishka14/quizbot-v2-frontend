import React from 'react'
import QuizCreate from '../quiz-create/QuizCreate'
import QuizView from '../quizview/QuizView'

function QuizMain() {
  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2">
      <QuizCreate />
      <QuizView />
    </div>
  )
}

export default QuizMain