import { useState } from 'react'
import './quizcreate.css'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']
const QUESTION_COUNTS = [5, 10, 15, 20]

const INITIAL_FORM = {
  topic: '',
  difficulty: 'Easy',
  count: 5,
}

function OptionGroup({ label, options, value, onChange }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-base font-semibold text-[var(--qb-primary)]">
        {label}
      </legend>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option === value
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option)}
              className={`qb-chip rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                isSelected
                  ? 'border-[var(--qb-secondary)] bg-[var(--qb-secondary)] text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-[var(--qb-secondary)] hover:text-[var(--qb-secondary)]'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function QuizCreate({ onGenerate }) {
  const [form, setForm] = useState(INITIAL_FORM)

  // Derived value, no useEffect/extra state needed
  const canGenerate = form.topic.trim().length > 0

  const updateField = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canGenerate) return
    onGenerate?.({ ...form, topic: form.topic.trim() })
  }

  return (
    <section className="flex w-full items-stretch justify-start">
      <form
        onSubmit={handleSubmit}
        className="h-full w-full max-w-lg space-y-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8"
      >
        <div className="space-y-3">
          <label
            htmlFor="quiz-topic"
            className="block text-base font-semibold text-[var(--qb-primary)]"
          >
            Enter the Topic to Generate Quiz
          </label>
          <input
            id="quiz-topic"
            type="text"
            value={form.topic}
            onChange={(e) => updateField('topic')(e.target.value)}
            placeholder="e.g. Solar System, React Hooks..."
            className="qb-input w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-[var(--qb-primary)] placeholder:text-gray-400"
          />
        </div>

        <OptionGroup
          label="Set the Difficulty Level"
          options={DIFFICULTIES}
          value={form.difficulty}
          onChange={updateField('difficulty')}
        />

        <OptionGroup
          label="Number of Questions"
          options={QUESTION_COUNTS}
          value={form.count}
          onChange={updateField('count')}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!canGenerate}
            className="qb-generate flex-1 rounded-2xl px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate
          </button>

          <button
            type="button"
            onClick={() => setForm(INITIAL_FORM)}
            className="qb-clear flex-1 rounded-2xl px-6 py-3 text-sm font-semibold"
          >
            Clear
          </button>
        </div>
      </form>
    </section>
  )
}

export default QuizCreate