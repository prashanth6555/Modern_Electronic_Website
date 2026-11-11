const ITEMS = [
  { title: 'Free shipping over $99', text: 'Under that, a flat $12. No surprise fees at the door.' },
  { title: '30-day returns', text: 'Changed your mind? Send it back in the original box.' },
  { title: 'Two-year warranty', text: 'Hardware coverage on every VOLT device we sell.' },
  { title: 'People, not bots', text: 'Support picks up. Weekdays 9–6 Pacific.' },
];

export default function TrustBar() {
  return (
    <section className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map((item) => (
        <div key={item.title} className="bg-ink px-5 py-8 text-white sm:px-6">
          <p className="font-display text-xl font-extrabold">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
        </div>
      ))}
    </section>
  );
}
