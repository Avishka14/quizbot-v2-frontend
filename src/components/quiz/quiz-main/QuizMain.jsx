import React from 'react'
import QuizCreate from '../quiz-create/QuizCreate'
import QuizView from '../quizview/QuizView'
import HowItWorks from '../how-it-works/HowItWorks'

function QuizMain() {
  return (
    <>
    <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2">
      <QuizCreate />
      <QuizView />
    </div>


    <hr className="mt-12 mb-2" />
    
    <HowItWorks/>
    
    </>
  )
}

export default QuizMain