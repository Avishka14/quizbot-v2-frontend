import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './account.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { useUser, useLogout } from '../../hooks/userUser'

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
      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
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
      className="qb-fade-in qb-delay-2 space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-5"
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

function Account() {
  const { data: user, isLoading, isError } = useUser()
  const logout = useLogout()
  const navigate = useNavigate()
  const [isLeaving, setIsLeaving] = useState(false)

  const handleLogout = () => setIsLeaving(true)

  // Wait for the fade-out to finish before actually logging out
  const handleAnimationEnd = async (e) => {
    if (isLeaving && e.target === e.currentTarget) {
      try {
        await logout()
        navigate('/', { replace: true })
      } catch {
        // Logout failed: let the user try again
        setIsLeaving(false)
      }
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <p className="p-8 text-center text-gray-500">Loading your account…</p>
        <Footer />
      </>
    )
  }

if (isError) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-gray-500">
          We couldn't load your account. Please refresh and try again.
        </p>
        <Link
          to="/login"
          className="rounded-2xl bg-[var(--qb-primary)] px-6 py-3 text-sm font-semibold text-white"
        >
          Log in
        </Link>
      </div>
      <Footer />
    </>
  )
}

  // Not logged in (401 -> null from useUser)
  if (!user) return <Navigate to="/login" replace />

  const { name, email, pictureUrl } = user

  return (
    <>
      <Header />

      <section
        onAnimationEnd={handleAnimationEnd}
        className={`flex w-full items-stretch justify-center px-4 py-10 ${
          isLeaving ? 'qb-fade-out' : 'qb-fade-in'
        }`}
      >
        <div className="w-full max-w-lg space-y-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
          <header className="qb-fade-in flex flex-col items-center gap-4 text-center">
            <Avatar src={pictureUrl} name={name} />
            <h1 className="text-xl font-semibold text-[var(--qb-primary)]">
              {name}
            </h1>
          </header>

          <dl className="qb-fade-in qb-delay-1 space-y-5 rounded-2xl border border-gray-200 p-5">
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
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Account