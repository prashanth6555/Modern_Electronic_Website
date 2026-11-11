export const btn =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40';

export const btnVolt = `${btn} bg-volt text-ink hover:brightness-105`;
export const btnInk = `${btn} bg-ink text-white hover:bg-black`;
export const btnWhite = `${btn} bg-white text-ink hover:bg-paper`;
export const btnGhost = `${btn} border border-white/40 text-white hover:bg-white hover:text-ink`;
export const btnLine = `${btn} border border-ink/15 bg-white text-ink hover:border-ink`;
