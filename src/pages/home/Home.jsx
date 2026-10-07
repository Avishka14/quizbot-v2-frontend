import React from 'react';
import './home.css';
import QuizMain from '../../components/quiz/quiz-main/QuizMain';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Home() {
  return (

    <>
    <Header/>
    
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="qb-fade-in text-3xl font-extrabold leading-tight tracking-tight text-[var(--qb-primary)] sm:text-4xl lg:text-5xl">
          Free Quiz Creator –{' '}
          <span className="text-[var(--qb-secondary)]">
            Turn Any Topic into an Engaging Quiz
          </span>
        </h1>

        <p className="qb-fade-in qb-delay-1 mx-auto mt-5 max-w-5xl text-base leading-relaxed text-[var(--qb-primary)]/70 sm:text-lg">
          AI-powered quizzes deliver instant, personalized feedback and adapt to
          your individual learning pace, helping you quickly identify knowledge
          gaps and retain information far more effectively than passive reading.
        </p>
      </header>

      <section className="qb-fade-in qb-delay-2" aria-label="Quiz creator">
        <QuizMain/>
        
      </section>
    </main>

   <Footer/>  
    </>
  );
}

export default Home;