export default function QtyControl({ value, onChange, max = 99 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-ink/15 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-10 w-10 place-items-center rounded-full text-lg transition hover:bg-paper"
      >
        −
      </button>
      <span className="w-7 text-center text-sm font-bold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="grid h-10 w-10 place-items-center rounded-full text-lg transition hover:bg-paper disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
