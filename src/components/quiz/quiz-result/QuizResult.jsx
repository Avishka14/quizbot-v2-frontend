function QuizResult({ submission, onRetry, onRestart }) {
  const { result, loading, error } = submission

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-bold text-[var(--qb-primary)]">Quiz Complete</h3>

      {loading && <p className="text-sm text-gray-500">Submitting your result…</p>}

      {error && !loading && (
        <div className="space-y-3">
          <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
          <button type="button" onClick={onRetry}
            className="w-full rounded-2xl bg-[var(--qb-secondary)] px-6 py-3 text-sm font-semibold text-white">
            Retry Submit
          </button>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-3">
          <p className="text-3xl font-bold text-[var(--qb-secondary)]">
            {result.mark} / {result.questionCount}
          </p>
          <div className="flex justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
            <span>Time taken</span>
            <span className="font-semibold">{result.totalTime}</span>
          </div>
        </div>
      )}

      <button type="button" onClick={onRestart} disabled={loading}
        className="w-full rounded-2xl border border-[var(--qb-secondary)] px-6 py-3 text-sm font-semibold text-[var(--qb-secondary)] disabled:opacity-50">
        Try Again
      </button>
    </div>
  )
}

export default QuizResult