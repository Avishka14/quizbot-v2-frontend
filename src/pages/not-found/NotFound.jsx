import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './notfound.css'


const PRIMARY = 'var(--qb-primary)'   
const SECONDARY = 'var(--qb-secondary)' 

function NotFound() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)

  // Start the fade out; navigation happens once the fade finishes.
  const handleBack = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return navigate(-1)
    setLeaving(true)
  }

  // Ignore the magnifier's looping animations bubbling up from children.
  const handleAnimationEnd = (e) => {
    if (leaving && e.target === e.currentTarget) navigate(-1)
  }

  return (
    // Three rows: [spacer] [404] [text + button]. The two outer rows are equal (1fr),
    // so the 404 sits exactly in the vertical middle of the viewport.
    <main
      onAnimationEnd={handleAnimationEnd}
      className={`nf-page ${leaving ? 'nf-leaving' : ''} relative mx-auto grid min-h-dvh max-w-6xl grid-rows-[1fr_auto_1fr] justify-items-center overflow-hidden px-4 text-center`}
      style={{ fontFamily: 'inherit' }}
    >
      {/* Scoped animations for the magnifier only. Disabled for reduced motion. */}
      <style>{`
        @keyframes nf-search {
          0%   { transform: translate(0, 0) rotate(-10deg); }
          25%  { transform: translate(10px, -6px) rotate(6deg); }
          50%  { transform: translate(-6px, 4px) rotate(12deg); }
          75%  { transform: translate(8px, 6px) rotate(-4deg); }
          100% { transform: translate(0, 0) rotate(-10deg); }
        }
        @keyframes nf-spin { to { transform: rotate(360deg); } }
        @keyframes nf-pulse {
          0%, 100% { opacity: .15; }
          50%      { opacity: .4; }
        }
        .nf-lens   { transform-box: fill-box; transform-origin: 50% 85%; animation: nf-search 6s ease-in-out infinite; }
        .nf-scan   { transform-box: fill-box; transform-origin: center; animation: nf-spin 3s linear infinite; }
        .nf-glow   { animation: nf-pulse 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .nf-lens, .nf-scan, .nf-glow { animation: none; }
        }
      `}</style>

      {/* Row 1: empty spacer */}
      <div aria-hidden="true" />

      {/* Row 2: 404, centered in the viewport */}
      <div className="relative flex items-center justify-center">
        {/* Soft backdrop glow, centered on the 404 */}
        <div
          aria-hidden="true"
          className="nf-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: SECONDARY }}
        />

        <div
          role="img"
          aria-label="404"
          className="relative flex items-center justify-center gap-2 font-black leading-none tracking-tighter"
          style={{ color: PRIMARY, fontSize: 'clamp(6rem, 24vw, 12rem)' }}
        >
          <span aria-hidden="true">4</span>

          <svg
            aria-hidden="true"
            viewBox="0 0 120 140"
            style={{ height: '0.85em', width: 'auto' }}
            fill="none"
          >
            <g className="nf-lens">
              {/* handle */}
              <line
                x1="88" y1="90" x2="110" y2="124"
                stroke={SECONDARY} strokeWidth="14" strokeLinecap="round"
              />
              {/* lens rim */}
              <circle cx="55" cy="55" r="42" stroke={SECONDARY} strokeWidth="12" />
              {/* lens fill */}
              <circle cx="55" cy="55" r="36" fill={SECONDARY} opacity="0.1" />
              {/* scanning arc */}
              <g className="nf-scan">
                <path
                  d="M55 27 A28 28 0 0 1 83 55"
                  stroke={SECONDARY} strokeWidth="4" strokeLinecap="round"
                />
              </g>
              {/* glint */}
              <path
                d="M32 44 A26 26 0 0 1 44 32"
                stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.7"
              />
            </g>
          </svg>

          <span aria-hidden="true">4</span>
        </div>
      </div>

      {/* Row 3: message, path and button, directly below the 404 */}
      <div className="relative flex flex-col items-center pt-8 pb-8">
        <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: PRIMARY }}>
          Page not found
        </h1>

        <p className="mt-3 max-w-md" style={{ color: PRIMARY }}>
          We looked everywhere, but there's nothing at this address. Check the link for typos or go back to the previous page.
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

        {/* Single button: rounded only, no hover, transition or shadow effects */}
        <button
          type="button"
          onClick={handleBack}
          className="mt-8 rounded-full px-6 py-2.5 font-semibold"
          style={{ background: SECONDARY, color: '#fff' }}
        >
          Go back
        </button>
      </div>
    </main>
  )
}

export default NotFound