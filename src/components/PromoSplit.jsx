import { Link } from 'react-router-dom';
import { products } from '../utils/catalog';
import SmartImage from './SmartImage';

const PANELS = [
  {
    category: 'Cameras',
    title: 'Glass that earns the walk.',
    id: 'cam-frame-m4',
  },
  {
    category: 'Smartwatches',
    title: 'Time, without the lecture.',
    id: 'watch-pulse-s9',
  },
];

export default function PromoSplit() {
  return (
    <section className="grid gap-1 md:grid-cols-2">
      {PANELS.map((panel) => {
        const product = products.find((item) => item.id === panel.id);
        return (
          <Link
            key={panel.category}
            to={`/shop?category=${encodeURIComponent(panel.category)}`}
            className="group relative flex min-h-[320px] items-end overflow-hidden md:min-h-[420px]"
          >
            <SmartImage
              src={product?.images[0]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
            <span className="relative p-6 text-white md:p-10">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ffb088]">
                {panel.category}
              </span>
              <span className="mt-2 block max-w-sm font-display text-4xl font-extrabold leading-[0.95] md:text-5xl">
                {panel.title}
              </span>
            </span>
          </Link>
        );
      })}
    </section>
  );
}
