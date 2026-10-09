import React from 'react'
import './comingsoon.css'

const PRIMARY = 'var(--qb-primary)'
const SECONDARY = 'var(--qb-secondary)'

function ComingSoon() {
  return (
    // Three rows: [spacer] [title] [text]. The outer rows are equal (1fr),
    // so the title sits exactly in the vertical middle of the viewport.
    <main
      className="cs-page relative mx-auto grid min-h-dvh max-w-6xl grid-rows-[1fr_auto_1fr] justify-items-center overflow-hidden px-4 text-center"
      style={{ fontFamily: 'inherit' }}
    >
      {/* Row 1: empty spacer */}
      <div aria-hidden="true" />

      {/* Row 2: title, centered in the viewport */}
      <div className="relative flex items-center justify-center">
        {/* Soft backdrop glow */}
        <div
          aria-hidden="true"
          className="cs-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: SECONDARY }}
        />

        <h1
          className="relative flex flex-col items-center font-black leading-none tracking-tighter sm:flex-row sm:gap-5"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 9rem)' }}
        >
          <span className="cs-fade" style={{ color: PRIMARY }}>
            Coming
          </span>
          <span className="cs-fade cs-fade-delay" style={{ color: SECONDARY }}>
            Soon
          </span>
        </h1>
      </div>

      {/* Row 3: message, status pill and loading dots */}
      <div className="relative flex flex-col items-center pt-8 pb-8">
        <p className="cs-fade-soft max-w-md" style={{ color: PRIMARY }}>
          We're working on something great. This page isn't ready yet, but it will be here before you know it.
        </p>

        <span
          className="mt-5 rounded-lg px-3 py-1.5 text-sm"
          style={{ color: SECONDARY, background: 'rgba(49, 149, 214, 0.1)' }}
        >
          Launching soon
        </span>

        <div className="mt-8 flex gap-2" role="status" aria-label="Coming soon">
          <span className="cs-dot" style={{ background: SECONDARY }} />
          <span className="cs-dot" style={{ background: SECONDARY }} />
          <span className="cs-dot" style={{ background: SECONDARY }} />
        </div>
      </div>
    </main>
  )
}

export default ComingSoon