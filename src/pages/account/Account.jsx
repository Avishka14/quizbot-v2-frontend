import { useState } from 'react'
import './account.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

function Avatar({ src, name }) {
  const [failed, setFailed] = useState(false)

  // Derived value, no useEffect/extra state needed
  const initial = name?.trim().charAt(0).toUpperCase() || '?'

  if (!src || failed) {
    return (
      <div
        aria-hidden="true"
        className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--qb-secondary)] text-4xl font-semibold text-white"
      >
        {initial}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${name}'s profile`}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-28 w-28 rounded-full object-cover shadow-md"
    />
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="space-y-1">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="break-words text-base font-semibold text-[var(--qb-primary)]">
        {value}
      </dd>
    </div>
  )
}

function SecurityNote() {
  return (
    <aside
      aria-labelledby="account-security-title"
      className="qb-fade-in qb-delay-2 space-y-3 rounded-2xl bg-gray-50 p-5"
    >
      <h2
        id="account-security-title"
        className="text-base font-semibold text-[var(--qb-primary)]"
      >
        Your account is secure
      </h2>
      <p className="text-sm leading-relaxed text-gray-600">
        We do not store passwords, because there are no passwords to store.
        Sign-in is handled entirely through Google, so your credentials are
        entered on Google's own secure page and never pass through our servers.
        This means they cannot be leaked, guessed, or reused from our side.
        Your account also benefits from the protections you already have with
        Google, such as two-step verification, suspicious sign-in detection, and
        device management. We only receive the basic profile details shown
        above (your name, email address, and profile picture) to personalise
        your experience, and nothing more. Signing out ends your session on
        this device at any time.
      </p>
    </aside>
  )
}

function Account({ user, onLogout }) {
  const [isLeaving, setIsLeaving] = useState(false)

  const { name = 'Guest User', email = '', photoURL = '' } = user ?? {}

  const handleLogout = () => setIsLeaving(true)

  // Wait for the fade-out to finish before actually logging out
  const handleAnimationEnd = (e) => {
    if (isLeaving && e.target === e.currentTarget) onLogout?.()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* flex-1 fills the space between Header and Footer; the card is centered in it */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <section
          onAnimationEnd={handleAnimationEnd}
          className={`w-full max-w-lg space-y-8 bg-white p-6 sm:p-8 ${
            isLeaving ? 'qb-fade-out' : 'qb-fade-in'
          }`}
        >
          <header className="qb-fade-in flex flex-col items-center gap-4 text-center">
            <Avatar src={photoURL} name={name} />
            <h1 className="text-xl font-semibold text-[var(--qb-primary)]">
              {name}
            </h1>
          </header>

          <dl className="qb-fade-in qb-delay-1 space-y-5 rounded-2xl bg-gray-50 p-5">
            <InfoRow label="Name" value={name} />
            <InfoRow label="Email" value={email || 'Not available'} />
          </dl>

          <SecurityNote />

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLeaving}
            className="qb-logout qb-fade-in qb-delay-3 w-full rounded-2xl px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Log Out
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Account