export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 px-3 sm:px-4 lg:px-5">
      <div className="max-w-3xl">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ember">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-extrabold md:text-5xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
