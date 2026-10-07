import React from 'react'
import "./history.css"
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import QuizHistory from '../../components/history-components/quiz-history/QuizHistory'

function History() {
  return (
    <>
    <Header/>

     <main className="mx-auto  justify-center px-4 sm:my-12 sm:px-6 lg:px-8">
      <QuizHistory />
      </main>



    <Footer/>
    </>
  )
}

export default History