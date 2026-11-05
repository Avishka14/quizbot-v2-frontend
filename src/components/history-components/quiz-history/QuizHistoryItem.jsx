import { useState } from 'react'
import './quizhistory.css'

const PLACEHOLDER = '—'


const scoreColor = (pct) =>
  pct >= 80 ? '#34C759' : pct >= 50 ? '#FF9500' : '#FF3B30'

function parseDate(value) {
  if (!value) return null
  const date = new Date(String(value).replace(/(\.\d{3})\d+/, '$1'))
  return Number.isNaN(date.getTime()) ? null : date
}

function formatDay(value) {
  const date = parseDate(value)
  if (!date) return PLACEHOLDER
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatClock(value) {
  const date = parseDate(value)
  if (!date) return ''
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Ring({ pct, color }) {
  return (
    <div className="relative h-12 w-12 shrink-0">
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E5EA" strokeWidth="3.5" />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray={`${pct} 100`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-gray-800">
        {pct}%
      </span>
    </div>
  )
}

function QuizHistoryItem({ attempt, number, delay = 0, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  const { createdDate, marks, takenTime, questionAnswerList = [] } = attempt

  const total = questionAnswerList.length
  const score = Number(marks) || 0
  const pct = total ? Math.round((score / total) * 100) : 0
  const color = scoreColor(pct)
  const clock = formatClock(createdDate)

  return (
    <article
      className="qb-fade-in overflow-hidden rounded-2xl bg-white shadow-sm"
      style={{ '--qb-delay': delay }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="qh-press flex w-full items-center gap-4 p-4 text-left"
      >
        <Ring pct={pct} color={color} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-gray-900">
            Quiz #{number}
          </p>
          <p className="truncate text-xs text-gray-500">
            {formatDay(createdDate)}
            {clock && ` · ${clock}`}
          </p>
          <p className="text-xs text-gray-500">Time {takenTime || PLACEHOLDER}</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold" style={{ color }}>
            {score}
            <span className="text-sm font-medium text-gray-400"> / {total}</span>
          </p>
        </div>

        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 shrink-0 text-gray-300 transition-transform ${
            open ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 4l6 6-6 6" />
        </svg>
      </button>

      {open && (
        <ul className="divide-y divide-black/5 border-t border-black/5">
          {total === 0 ? (
            <li className="p-5 text-center text-sm text-gray-500">
              No answers were recorded for this quiz.
            </li>
          ) : (
            questionAnswerList.map((item, index) => (
              <li key={item.id ?? index} className="flex gap-3 px-4 py-3">
                <span className="w-5 shrink-0 pt-0.5 text-sm font-medium text-gray-400">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.question || 'Untitled question'}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Correct answer:{' '}
                    <span className="font-medium text-[#34C759]">
                      {item.correctAnswer || 'Not available'}
                    </span>
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </article>
  )
}

export default QuizHistoryItem