function StarPath() {
  return <path d="M10 1.6 12.3 6.7l5.6.7-4.1 3.8 1.1 5.5L10 14.2 4.9 16.7l1.1-5.5L1.9 7.4l5.6-.7L10 1.6z" />;
}

export default function Stars({ value, reviews }) {
  const width = `${Math.max(0, Math.min(5, value)) * 20}%`;

  return (
    <div className="flex items-center gap-1.5" aria-label={`${value} out of 5 stars`}>
      <span className="relative inline-flex h-3.5 w-[70px]">
        <span className="absolute inset-0 flex text-ink/15">
          {Array.from({ length: 5 }, (_, index) => (
            <svg key={index} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <StarPath />
            </svg>
          ))}
        </span>
        <span className="absolute inset-y-0 left-0 flex overflow-hidden text-amber-500" style={{ width }}>
          {Array.from({ length: 5 }, (_, index) => (
            <svg key={index} viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
              <StarPath />
            </svg>
          ))}
        </span>
      </span>
      <span className="text-xs font-semibold text-ink/55">{Number(value).toFixed(1)}</span>
      {typeof reviews === 'number' && (
        <span className="text-xs text-ink/40">({reviews.toLocaleString()})</span>
      )}
    </div>
  );
}
