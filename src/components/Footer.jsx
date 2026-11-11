import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/catalog';
import { btnVolt } from '../utils/styles';
import { Logo } from './Logo';

const HELP = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/support', label: 'Customer Support' },
  { to: '/faq', label: 'FAQs' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Enter a real email address.');
      return;
    }
    setError('');
    setJoined(true);
  };

  return (
    <footer className="bg-ink px-4 pb-24 pt-14 text-white sm:px-6 md:pb-10">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            Curated electronics with honest specs, a two-year warranty, and prices that do not need a magnifying glass.
          </p>
          {joined ? (
            <p className="mt-5 text-sm font-bold text-volt">You are on the list. We will write when the next drop lands.</p>
          ) : (
            <form onSubmit={submit} className="mt-5">
              <label className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/45" htmlFor="drop-email">
                Drop alerts
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="drop-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm outline-none ring-1 ring-white/15 placeholder:text-white/40 focus:ring-volt"
                />
                <button type="submit" className={`${btnVolt} shrink-0 px-4`}>
                  Join
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-volt">{error}</p>}
            </form>
          )}
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/45">Shop</h2>
          <ul className="mt-4 space-y-2">
            {CATEGORIES.map((name) => (
              <li key={name}>
                <Link to={`/shop?category=${encodeURIComponent(name)}`} className="text-sm font-semibold text-white/80 transition hover:text-volt">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/45">Help</h2>
          <ul className="mt-4 space-y-2">
            {HELP.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm font-semibold text-white/80 transition hover:text-volt">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/45">Visit</h2>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-white/75">
            <p>120 Market Street</p>
            <p>San Francisco, CA 94105</p>
            <p>
              <a className="hover:text-volt" href="mailto:hello@volt.store">hello@volt.store</a>
            </p>
            <p>
              <a className="hover:text-volt" href="tel:+14155550198">+1 (415) 555-0198</a>
            </p>
            <p className="text-white/50">Weekdays 9–6 Pacific</p>
          </address>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <p className="text-xs text-white/45">© {new Date().getFullYear()} VOLT Electronics. Demo store, no real checkout.</p>
        <div className="flex gap-2">
          <Social label="Instagram" href="https://instagram.com">
            <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z" />
            <circle cx="12" cy="12" r="3.2" />
            <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
          </Social>
          <Social label="YouTube" href="https://youtube.com">
            <path d="M4 8.5a3 3 0 0 1 3-2.2h10a3 3 0 0 1 3 2.8v6.4a3 3 0 0 1-3 2.8H7a3 3 0 0 1-3-2.8V8.5z" />
            <path d="m11 10 4 2-4 2v-4z" fill="currentColor" stroke="none" />
          </Social>
          <Social label="X" href="https://x.com">
            <path d="M5 5.5 10.4 12 5 18.5h2.1l4.2-4.9 3.6 4.9H19l-5.7-7.2L18.6 5.5H16.5l-3.8 4.4-3.3-4.4H5z" />
          </Social>
          <Social label="Facebook" href="https://facebook.com">
            <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
          </Social>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-volt hover:bg-volt hover:text-ink"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
