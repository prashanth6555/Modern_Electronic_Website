export function Logo({ className = '', light = false }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-[0.14em] ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? '#FF5A1F' : '#FF5A1F'} />
        <path d="M18 4 9 18h6l-2 10 11-15h-7l1-9z" fill="#121212" />
      </svg>
      VOLT
    </span>
  );
}
