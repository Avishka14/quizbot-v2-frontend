import { useState } from 'react'
import QuizResult from '../quiz-result/QuizResult' // adjust to where you put QuizResult.jsx

function QuizView({ quiz, submission, onFinish, onRestart }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])

  const questions = quiz?.questions ?? []
  const question = questions[current]
  const isLast = current === questions.length - 1

  const handleSubmit = () => {
    if (selected === null || submitted) return
    setSubmitted(true)

    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        correctAnswer: question.correctAnswer,
        userAnswer: selected,
        isCorrect: selected === question.correctAnswer,
      },
    ])
  }

  const handleNext = () => {
    if (isLast) {
      setFinished(true)
      onFinish?.(answers) // parent submits to the server
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setSubmitted(false)
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setSubmitted(false)
    setAnswers([])
    setFinished(false)
    onRestart?.() // parent clears result/error/loading
  }

  // Option colour: after submit, correct answer -> green, picked wrong answer -> red
  const getOptionStyle = (opt) => {
    const isPicked = opt === selected
    const isAnswer = opt === question.correctAnswer

    if (submitted) {
      if (isAnswer) return 'border-green-600 bg-green-50 text-green-800'
      if (isPicked) return 'border-red-600 bg-red-50 text-red-800'
      return 'border-gray-200 bg-white text-gray-400'
    }
    if (isPicked) {
      return 'border-[var(--qb-secondary)] bg-[var(--qb-secondary)]/10 text-[var(--qb-primary)]'
    }
    return 'border-gray-300 bg-white text-gray-700 hover:border-[var(--qb-secondary)]'
  }

  return (
    <section className="flex w-full items-stretch justify-end">
      <div className="h-full w-full max-w-lg space-y-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
        {!quiz || questions.length === 0 ? (
          <h3 className="text-base font-semibold text-[var(--qb-primary)]">
            Generated Quizzes will appear here
          </h3>
        ) : finished ? (
          <QuizResult
            submission={submission}
            onRetry={() => onFinish?.(answers)}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold capitalize">{quiz.topic}</span>
              <span>
                Question {current + 1} of {questions.length}
              </span>
            </div>

            <p className="text-base font-semibold text-[var(--qb-primary)]">
              {question.question}
            </p>

            <div className="space-y-2">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  disabled={submitted}
                  aria-pressed={opt === selected}
                  onClick={() => setSelected(opt)}
                  className={`block w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${getOptionStyle(opt)}`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={selected === null || submitted}
                className="flex-1 rounded-2xl bg-[var(--qb-secondary)] px-6 py-3 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit
              </button>

              {submitted && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold text-[var(--qb-primary)] hover:border-[var(--qb-secondary)]"
                >
                  {isLast ? 'Finish' : 'Next'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default QuizView