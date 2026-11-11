const ITEMS = [
  'Free shipping over $99',
  'Two-year warranty',
  '30-day returns',
  'Same-week dispatch',
  'Price match on flagship phones',
  'Real people on support',
];

function Row({ prefix }) {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={`${prefix}-${item}`} className="flex items-center gap-4 px-5 py-3 text-sm font-extrabold">
          {item}
          <span aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-volt text-ink">
      <div className="flex w-max animate-marquee">
        <Row prefix="a" />
        <Row prefix="b" />
      </div>
    </div>
  );
}
