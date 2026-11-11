import { Link } from 'react-router-dom';
import { CATEGORIES, products } from '../utils/catalog';
import SmartImage from './SmartImage';

const BLURBS = {
  Mobiles: 'Pocket flagships',
  Laptops: 'All-day machines',
  Headphones: 'Closer listening',
  'Smart TVs': 'Living room cinema',
  Cameras: 'Sharper days',
  Smartwatches: 'On the wrist',
  Accessories: 'Finish the setup',
};

export default function CategoryGrid() {
  return (
    <section className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7" aria-label="Product categories">
      {CATEGORIES.map((name, index) => {
        const sample = products.find((product) => product.category === name);
        return (
          <Link
            key={name}
            to={`/shop?category=${encodeURIComponent(name)}`}
            className={`group relative block min-h-[210px] overflow-hidden ${
              index === CATEGORIES.length - 1 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <SmartImage
              src={sample?.images[0]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10 transition duration-300 group-hover:from-black/85" />
            <span className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                {BLURBS[name]}
              </span>
              <span className="mt-1 block font-display text-lg font-extrabold leading-none sm:text-xl xl:text-2xl">{name}</span>
            </span>
          </Link>
        );
      })}
    </section>
  );
}
