import './quizhistory.css'

const PLACEHOLDER = '—'

// Safely formats a date; falls back to the raw value or a placeholder.
function formatDate(value) {
  if (!value) return PLACEHOLDER
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function StatCard({ label, value, delay }) {
  return (
    <div
      className="qb-fade-in rounded-2xl border border-gray-200 bg-white p-4"
      style={{ '--qb-delay': delay }}
    >
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold text-[var(--qb-primary)]">
        {value}
      </dd>
    </div>
  )
}

function AnswerItem({ index, title, answer }) {
  return (
    <li
      className="qb-fade-in rounded-2xl border border-gray-200 bg-white p-5"
      style={{ '--qb-delay': index + 4 }}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--qb-secondary)] text-sm font-semibold text-white"
        >
          {index + 1}
        </span>

        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="text-base font-semibold text-[var(--qb-primary)]">
            {title || 'Untitled question'}
          </h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-[var(--qb-secondary)]">
              Your answer:{' '}
            </span>
            {answer || 'No answer provided'}
          </p>
        </div>
      </div>
    </li>
  )
}

/**
 * Displays the details of a single completed quiz attempt.
 *
 * attempt shape:
 * {
 *   takenBy?: string,
 *   date?: string | number | Date,
 *   marks?: string | number,
 *   totalMarks?: string | number,
 *   totalTime?: string,
 *   answers?: Array<{ id: string | number, title: string, answer: string }>
 * }
 */
function QuizHistory({ attempt = {} }) {
  const {
    takenBy = 'You',
    date,
    marks,
    totalMarks,
    totalTime,
    answers = [],
  } = attempt

  // Derived values: computed during render, no extra state or effects needed
  const marksLabel =
    marks == null
      ? PLACEHOLDER
      : totalMarks == null
        ? String(marks)
        : `${marks} / ${totalMarks}`

  return (
    <section className="w-full max-w-2xl space-y-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <header className="qb-fade-in space-y-1">
        <p className="text-sm font-medium text-[var(--qb-secondary)]">
          Quiz history
        </p>
        <h2 className="text-2xl font-bold text-[var(--qb-primary)]">
          Quiz taken by {takenBy}
        </h2>
      </header>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Date" value={formatDate(date)} delay={1} />
        <StatCard label="Marks" value={marksLabel} delay={2} />
        <StatCard label="Total time" value={totalTime || PLACEHOLDER} delay={3} />
      </dl>

      <div className="space-y-3">
        <h3 className="qb-fade-in text-base font-semibold text-[var(--qb-primary)]">
          Questions and answers
        </h3>

        {answers.length === 0 ? (
          <p className="qb-fade-in rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
            No answers were recorded for this quiz.
          </p>
        ) : (
          <ul className="space-y-3">
            {answers.map((item, index) => (
              <AnswerItem
                key={item.id ?? index}
                index={index}
                title={item.title}
                answer={item.answer}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default QuizHistory