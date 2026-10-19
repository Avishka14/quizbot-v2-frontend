import React from 'react'
import HowItWorks from '../how-it-works/HowItWorks'
import WhyQuizBot from '../why-quizbot/WhyQuizBot'
import QuizBuilder from '../quiz-create/QuizBuilder'

function QuizMain() {
  return (
    <>
    
    <QuizBuilder/>
 
    <hr className="mt-12 mb-2" />
    
    <HowItWorks/>

    <hr className="mt-2 mb-2" />

    <WhyQuizBot/>
    
    </>
  )
}

export default QuizMain