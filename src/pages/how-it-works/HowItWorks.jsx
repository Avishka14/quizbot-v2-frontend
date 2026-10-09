import React from 'react'
import './howitworks.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const PRIMARY = 'var(--qb-primary)'
const SECONDARY = 'var(--qb-secondary)'

// Shared stroke styling for the step icons
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const STEPS = [
  {
    title: 'You ask',
    text: 'Pick a topic, a difficulty and how many questions you want.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    title: 'Backend prepares',
    text: 'Our server validates your input and builds a clear prompt for the AI.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'OpenRouter routes',
    text: 'The request is sent through OpenRouter to the selected AI model.',
    icon: (
      <svg {...iconProps}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.5 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.5" />
      </svg>
    ),
  },
  {
    title: 'AI generates',
    text: 'The model writes your quiz: questions, options and correct answers.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        <path d="M19 16v4M17 18h4" />
      </svg>
    ),
  },
  {
    title: 'Quiz delivered',
    text: 'The backend sends the finished quiz back to you, ready to play.',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 9l2 2 3-3M8 16h8" />
      </svg>
    ),
  },
]

function HowItWorks() {
  return (

    <>  
    <Header/>

    <main
      className="hw-page relative mx-auto min-h-dvh max-w-6xl overflow-hidden px-4 py-16 text-center"
      style={{ fontFamily: 'inherit' }}
    >
      {/* Soft backdrop glow */}
      <div
        aria-hidden="true"
        className="hw-glow pointer-events-none absolute left-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: SECONDARY }}
      />

      {/* Heading */}
      <header className="relative flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tighter sm:text-6xl" style={{ color: PRIMARY }}>
          How <span style={{ color: SECONDARY }}>QuizBot</span> works
        </h1>
        <p className="mt-4 max-w-xl" style={{ color: PRIMARY }}>
          From a single idea to a ready-made quiz in a few seconds. Here's the journey of your request.
        </p>
      </header>

      {/* Flow: vertical on small screens, horizontal on xl and up */}
      <ol className="relative mt-14 flex list-none flex-col items-center p-0 xl:flex-row xl:items-stretch xl:justify-center">
        {STEPS.map((step, i) => (
          <React.Fragment key={step.title}>
            <li
              className="hw-step flex w-full max-w-xs flex-col items-center rounded-2xl px-5 py-6 xl:w-44"
              style={{ '--i': i, background: 'rgba(49, 149, 214, 0.1)' }}
            >
              <span
                className="hw-icon flex h-14 w-14 items-center justify-center rounded-full"
                style={{ color: '#fff', background: SECONDARY }}
              >
                <span className="h-7 w-7">{step.icon}</span>
              </span>
              <span className="mt-4 text-sm font-semibold" style={{ color: SECONDARY }}>
                Step {i + 1}
              </span>
              <h2 className="mt-1 text-lg font-bold" style={{ color: PRIMARY }}>
                {step.title}
              </h2>
              <p className="mt-2 text-sm" style={{ color: PRIMARY }}>
                {step.text}
              </p>
            </li>

            {i < STEPS.length - 1 && (
              <div aria-hidden="true" className="hw-connector" style={{ '--i': i }} />
            )}
          </React.Fragment>
        ))}
      </ol>

      {/* Example request payload */}
      <div className="relative mt-14 flex flex-col items-center">
        <p className="text-sm" style={{ color: PRIMARY }}>
          Your request to the backend looks like this
        </p>
        <code
          className="mt-3 max-w-full truncate rounded-lg px-3 py-1.5 text-sm"
          style={{
            color: SECONDARY,
            background: 'rgba(49, 149, 214, 0.1)',
            fontFamily: 'inherit',
          }}
        >
          {'{ topic, difficulty, numberOfQuestions }'}
        </code>
      </div>
    </main>

    <Footer/>
    </>
  )
}

export default HowItWorks