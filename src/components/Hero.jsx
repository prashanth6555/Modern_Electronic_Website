import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { money, productById, salePrice } from '../utils/catalog';
import { btnGhost, btnVolt } from '../utils/styles';
import SmartImage from './SmartImage';
import Stars from './Stars';

const SLIDES = [
  {
    id: 'mob-lumen-x1',
    eyebrow: 'Flagship drop',
    title: 'A phone that keeps up with late light.',
    text: 'Brighter OLED, a calmer camera, and a battery that still has opinions at midnight.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2000&q=80',
    focus: 'object-[42%_18%]',
  },
  {
    id: 'lap-drift-14',
    eyebrow: 'Work kit',
    title: 'Fourteen inches. No extra luggage.',
    text: 'A quiet chassis, a sharp panel, and enough battery for a day that refuses to end.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=2000&q=80',
    focus: 'object-center',
  },
  {
    id: 'aud-quietroom',
    eyebrow: 'Listening room',
    title: 'Turn the commute down.',
    text: 'Deep noise control, soft earcups, and a tune that does not shout over the song.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2000&q=80',
    focus: 'object-[70%_center]',
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const product = productById(slide.id);
  const sale = salePrice(product);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 5600);
    return () => clearInterval(timer);
  }, [index]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.target instanceof HTMLElement && event.target.matches('input, textarea, select')) return;
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % SLIDES.length);
      if (event.key === 'ArrowLeft') setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="relative bg-ink text-white" aria-roledescription="carousel">
      <div className="absolute inset-0 overflow-hidden">
        {SLIDES.map((item, itemIndex) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${itemIndex === index ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <SmartImage
              src={item.image}
              alt=""
              priority={itemIndex === 0}
              className={`absolute inset-0 h-full w-full object-cover ${item.focus} ${itemIndex === index ? 'animate-drift' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-center px-4 pb-28 pt-24 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div key={slide.id} className="hero-copy max-w-3xl animate-fade-up">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#ffb088]">{slide.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,6.4vw,4.7rem)] font-extrabold leading-[0.92]">{slide.title}</h1>
            <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">{slide.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className={btnVolt}>
                Shop {product.category}
              </Link>
              <Link to={`/product/${product.id}`} className={btnGhost}>
                View the {product.name}
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3">
              {SLIDES.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show slide ${itemIndex + 1}`}
                  onClick={() => setIndex(itemIndex)}
                  className="h-1 w-14 overflow-hidden rounded-full bg-white/30"
                >
                  {itemIndex === index && <span key={index} className="block h-full w-full animate-progress bg-volt" />}
                  {itemIndex < index && <span className="block h-full w-full bg-white" />}
                </button>
              ))}
            </div>
          </div>

          <aside className="animate-floaty hidden justify-self-end lg:block">
            <div className="w-[320px] rounded-[28px] bg-white/95 p-4 text-ink shadow-2xl backdrop-blur">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ember">{product.category}</p>
              <h2 className="mt-1 text-3xl font-extrabold leading-none">{product.name}</h2>
              <div className="mt-3">
                <Stars value={product.rating} reviews={product.reviews} />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-extrabold">{money(sale)}</p>
                  <p className="text-sm text-ink/40 line-through">{money(product.price)}</p>
                </div>
                <span className="rounded-full bg-volt px-3 py-1 text-sm font-extrabold">-{product.discount}%</span>
              </div>
              <Link to={`/product/${product.id}`} className={`${btnVolt} mt-5 w-full`}>
                See details
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <div className="absolute bottom-24 right-4 z-10 flex gap-2 md:bottom-8 md:right-8">
        <HeroArrow label="Previous slide" onClick={() => setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length)}>
          ←
        </HeroArrow>
        <HeroArrow label="Next slide" onClick={() => setIndex((current) => (current + 1) % SLIDES.length)}>
          →
        </HeroArrow>
      </div>
    </section>
  );
}

function HeroArrow({ children, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 text-lg backdrop-blur transition hover:bg-white hover:text-ink"
    >
      {children}
    </button>
  );
}
