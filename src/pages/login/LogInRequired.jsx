import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './login.css'

const PRIMARY = 'var(--qb-primary)'
const SECONDARY = 'var(--qb-secondary)'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Small, pure presentational piece: the padlock that replaces the "404" art.
function Padlock() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 140"
      style={{ height: '1em', width: 'auto' }}
      fill="none"
    >
      <g className="lr-lock">
        {/* shackle */}
        <g className="lr-shackle">
          <path
            d="M35 62 V42 a25 25 0 0 1 50 0 V62"
            stroke={SECONDARY}
            strokeWidth="12"
            strokeLinecap="round"
          />
        </g>
        {/* body */}
        <rect x="18" y="60" width="84" height="66" rx="14" fill={SECONDARY} />
        {/* keyhole */}
        <circle cx="60" cy="88" r="9" fill="#fff" />
        <rect x="56" y="92" width="8" height="18" rx="4" fill="#fff" />
        {/* glint */}
        <path
          d="M30 76 V104"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
    </svg>
  )
}

function LogInRequired({ loginPath = '/login' }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  // Holds the pending destination while the fade out plays (null = not leaving).
  const [destination, setDestination] = useState(null)

  // Derived inline, no extra state or effect needed.
  const leaving = destination !== null

  // Start the fade out; navigation happens once it finishes.
  const leaveTo = (to) => {
    if (leaving) return
    if (prefersReducedMotion()) return go(to)
    setDestination(to)
  }

  const go = (to) => {
    if (to === loginPath) {
      // Let the login page send the user back here after signing in.
      navigate(loginPath, { state: { from: pathname } })
    } else {
      navigate(to)
    }
  }

  // Ignore the padlock's looping animations and the fade in bubbling up from children.
  const handleAnimationEnd = (e) => {
    if (leaving && e.target === e.currentTarget) go(destination)
  }

  return (
    // Three rows: [spacer] [padlock] [text + buttons]. A smaller top spacer
    // moves the content higher in the viewport.
    <main
      onAnimationEnd={handleAnimationEnd}
      className={`lr-page ${leaving ? 'lr-leaving' : ''} relative mx-auto grid min-h-dvh max-w-6xl grid-rows-[0.65fr_auto_1fr] justify-items-center overflow-hidden px-4 text-center`}
      style={{ fontFamily: 'inherit' }}
    >
      {/* Row 1: empty spacer */}
      <div aria-hidden="true" />

      {/* Row 2: padlock, centered in the viewport */}
      <div className="relative flex items-center justify-center">
        {/* Soft backdrop glow */}
        <div
          aria-hidden="true"
          className="lr-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: SECONDARY }}
        />

        <div
          role="img"
          aria-label="Locked"
          className="relative flex items-center justify-center leading-none"
          style={{ fontSize: 'clamp(6rem, 24vw, 12rem)' }}
        >
          <Padlock />
        </div>
      </div>

      {/* Row 3: message, path and buttons, directly below the padlock */}
      <div className="lr-rise relative flex flex-col items-center pt-8 pb-8">
        <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: PRIMARY }}>
          Log in required
        </h1>

        <p className="mt-3 max-w-md" style={{ color: PRIMARY }}>
          You need to be signed in to view this page. Log in to continue, or go back to the previous page.
        </p>

        <code
          className="mt-5 max-w-full truncate rounded-lg px-3 py-1.5 text-sm"
          style={{
            color: SECONDARY,
            background: 'rgba(49, 149, 214, 0.1)',
            fontFamily: 'inherit',
          }}
        >
          {pathname}
        </code>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Rounded only, no hover, transition or shadow effects */}
          <button
            type="button"
            onClick={() => leaveTo(loginPath)}
            className="rounded-full px-6 py-2.5 font-semibold"
            style={{ background: SECONDARY, color: '#fff' }}
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => leaveTo(-1)}
            className="rounded-full px-6 py-2.5 font-semibold"
            style={{ background: 'transparent', color: SECONDARY, border: `2px solid ${SECONDARY}` }}
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  )
}

export default LogInRequired