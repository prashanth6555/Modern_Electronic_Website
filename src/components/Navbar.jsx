import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../utils/catalog';
import { IconCart, IconClose, IconMenu, IconSearch } from './Icons';
import { Logo } from './Logo';

const LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?sort=discount', label: 'Deals' },
  { to: '/support', label: 'Support' },
];

export default function Navbar() {
  const { count } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const home = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const solid = !home || scrolled || open || searchOpen;

  const submitSearch = (event) => {
    event.preventDefault();
    const query = term.trim();
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
    setSearchOpen(false);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-white transition duration-300 ${
        solid ? 'border-b border-white/10 bg-ink/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex h-16 items-center gap-3 px-3 sm:px-4">
        <Link to="/" aria-label="VOLT home" className="text-white">
          <Logo />
        </Link>

        <nav className="ml-4 hidden items-center gap-6 md:flex" aria-label="Primary">
          <div className="group relative">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `text-sm font-bold transition hover:text-volt ${isActive ? 'text-volt' : ''}`
              }
            >
              Shop
            </NavLink>
            <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
              <div className="w-64 rounded-2xl bg-white p-2 text-ink shadow-2xl">
                {CATEGORIES.map((name) => (
                  <Link
                    key={name}
                    to={`/shop?category=${encodeURIComponent(name)}`}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-paper"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {LINKS.slice(1).map((link) => (
            <Link key={link.label} to={link.to} className="text-sm font-bold transition hover:text-volt">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <form onSubmit={submitSearch} className="hidden lg:block" role="search">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search electronics"
                className="w-64 rounded-full bg-white/10 py-2 pl-9 pr-4 text-sm text-white outline-none ring-1 ring-white/15 placeholder:text-white/45 focus:ring-volt"
              />
            </label>
          </form>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10 lg:hidden"
            aria-label="Open search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((value) => !value)}
          >
            <IconSearch />
          </button>
          <Link
            to="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10"
          >
            <IconCart />
            {count > 0 && (
              <span
                key={count}
                className="absolute right-1 top-1 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-volt px-1 text-[11px] font-extrabold text-ink"
              >
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="px-3 pb-3 lg:hidden" role="search">
          <label className="block">
            <span className="sr-only">Search products</span>
            <input
              autoFocus
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search electronics"
              className="w-full rounded-full bg-white/10 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/15 placeholder:text-white/45 focus:ring-volt"
            />
          </label>
        </form>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink px-5 py-4 text-white md:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center">
              <IconClose />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-3 overflow-y-auto pb-10" aria-label="Mobile">
            {[
              { to: '/', label: 'Home' },
              { to: '/shop', label: 'Shop' },
              { to: '/shop?sort=discount', label: 'Deals' },
              { to: '/cart', label: 'Cart' },
            ].map((link, index) => (
              <Link
                key={link.label}
                to={link.to}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-fade-up font-display text-4xl font-extrabold"
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40">Categories</p>
            {CATEGORIES.map((name) => (
              <Link key={name} to={`/shop?category=${encodeURIComponent(name)}`} className="text-lg font-semibold text-white/85">
                {name}
              </Link>
            ))}
            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40">Help</p>
            <Link to="/about" className="text-lg font-semibold">About</Link>
            <Link to="/contact" className="text-lg font-semibold">Contact</Link>
            <Link to="/support" className="text-lg font-semibold">Customer Support</Link>
            <Link to="/faq" className="text-lg font-semibold">FAQs</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
