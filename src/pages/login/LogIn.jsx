import React, { useState, useEffect } from 'react'
import './logIn.css'

function GoogleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z" />
    </svg>
  )
}

function LogIn({ onGoogleLogin, onCancel }) {
  const [loading, setLoading] = useState(false)

  async function handleGoogleLogin() {
    setLoading(true)
    try {
      await onGoogleLogin?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-overlay-fade fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        aria-describedby="login-desc"
        className="login-dialog-fade w-full max-w-[340px] overflow-hidden rounded-[18px] bg-white/90 text-center shadow-2xl backdrop-blur-xl sm:max-w-[400px]"
      >
        {/* Content */}
        <div className="px-6 pb-7 pt-7">
          <h2
            id="login-title"
            className="text-[22px] font-semibold leading-snug text-[var(--qb-primary)]"
          >
            Sign in with Google
          </h2>
          <p
            id="login-desc"
            className="mt-2 text-[15px] leading-relaxed text-[var(--qb-primary)]/70"
          >
            Skip the passwords. Sign in instantly with Google using{' '}
            <span className="font-medium text-[var(--qb-secondary)]">
              one-click login
            </span>{' '}
            — fast, secure, and no new account to remember.
          </p>
        </div>

        {/* Primary action */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 border-t border-black/15 py-4 text-[18px] font-semibold text-[var(--qb-secondary)] transition-colors hover:bg-black/5 active:bg-black/10 disabled:opacity-50"
        >
          <GoogleIcon />
          {loading ? 'Signing in…' : 'Continue with Google'}
        </button>

        {/* Secondary action */}
        <button
          type="button"
          onClick={onCancel}
          className="w-full border-t border-black/15 py-4 text-[18px] text-[var(--qb-primary)] transition-colors hover:bg-black/5 active:bg-black/10"
        >
          Not Now
        </button>
      </div>
    </div>
  )
}

export default LogIn