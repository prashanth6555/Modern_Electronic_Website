export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <header className="bg-ink px-4 pb-12 pt-12 text-white sm:px-6 md:pb-16 md:pt-16">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#ffb088]">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl text-4xl font-extrabold md:text-6xl">{title}</h1>
      {text && <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">{text}</p>}
      {children}
    </header>
  );
}
