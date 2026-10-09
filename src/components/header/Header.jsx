import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import './header.css'

const links = [
  { label: 'Generate', to: '/' },
  { label: 'History', to: '/history' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'How It Works', to: '/how' },
  { label: 'Account', to: '/login' },
]

function Header() {
  const [open, setOpen] = useState(false)

  // Close the dialog with Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="qb-header sticky top-0 z-50 w-full">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        {/* Logo — left */}
        <Link
          to="/"
          className="justify-self-start text-4xl font-extrabold tracking-tight text-black"
        >
          Quiz<span className="text-[#3195D6]">Bot</span>
        </Link>

        {/* Desktop nav — center */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className="qb-link text-[17px] font-medium"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile arrow trigger — right */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Toggle navigation menu"
          className="qb-arrow col-start-3 flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-black/15 text-black md:hidden"
        >
          <ChevronDown size={20} strokeWidth={2.25} />
        </button>
      </div>

      {/* iOS-style dialog (mobile only) */}
      {open && (
        <div className="md:hidden">
          <div
            className="qb-backdrop fixed inset-0 top-16"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="qb-dialog absolute right-4 top-[68px] w-[calc(100%-2rem)] max-w-xs overflow-hidden"
          >
            <p className="qb-dialog-title font-semibold">Menu</p>
            {links.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className="qb-dialog-item"
              >
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="qb-dialog-item qb-dialog-close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header