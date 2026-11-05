import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getQuizHistory } from '../../../api/quizApi'
import QuizHistoryItem from './QuizHistoryItem'
import './quizhistory.css'


function toSeconds(time) {
  if (!time) return 0
  const parts = String(time).split(':').map(Number)
  if (parts.some(Number.isNaN)) return 0
  return parts.reduce((acc, n) => acc * 60 + n, 0)
}

function formatTotalTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return `${seconds}s`
}

function Stat({ label, value, delay }) {
  return (
    <div
      className="qb-fade-in rounded-2xl bg-white p-4 shadow-sm"
      style={{ '--qb-delay': delay }}
    >
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  )
}

function QuizHistory() {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = () => {
    setLoading(true)
    setError(false)

    const request = getQuizHistory()

    toast.promise(request, {
      loading: 'Loading your quiz history…',
      success: (data) => `Loaded ${data.length} quiz${data.length === 1 ? '' : 'zes'}`,
      error: 'Could not load quiz history',
    })

    return request
      .then((data) => {
        const sorted = [...data].sort((a, b) =>
          String(b.createdDate).localeCompare(String(a.createdDate))
        )
        setAttempts(sorted)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dashboard numbers
  const percents = attempts.map((a) => {
    const total = a.questionAnswerList?.length || 0
    return total ? (Number(a.marks) / total) * 100 : 0
  })
  const average = percents.length
    ? Math.round(percents.reduce((s, p) => s + p, 0) / percents.length)
    : 0
  const best = percents.length ? Math.round(Math.max(...percents)) : 0
  const totalSeconds = attempts.reduce((s, a) => s + toSeconds(a.takenTime), 0)

  return (
    <section className="qh-root mx-auto w-full max-w-4xl space-y-5 rounded-3xl bg-[#F2F2F7] p-4 sm:p-6">
      <header className="px-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">History</h1>
        <p className="text-sm text-gray-500">Your past quizzes at a glance</p>
      </header>

      {loading && (
        <div className="grid gap-3 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="space-y-3 rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-600">Something went wrong.</p>
          <button
            type="button"
            onClick={load}
            className="rounded-full bg-[#007AFF] px-5 py-2 text-sm font-semibold text-white active:opacity-80"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && attempts.length === 0 && (
        <p className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
          You haven't taken any quizzes yet.
        </p>
      )}

      {!loading && !error && attempts.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Quizzes" value={attempts.length} delay={0} />
            <Stat label="Average" value={`${average}%`} delay={1} />
            <Stat label="Best" value={`${best}%`} delay={2} />
            <Stat label="Total time" value={formatTotalTime(totalSeconds)} delay={3} />
          </div>

          <h2 className="px-1 pt-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Recent quizzes
          </h2>

          <div className="grid items-start gap-3 lg:grid-cols-2">
            {attempts.map((attempt, i) => (
              <QuizHistoryItem
                key={attempt.id}
                attempt={attempt}
                number={attempts.length - i}
                delay={Math.min(i, 8) + 4}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default QuizHistory