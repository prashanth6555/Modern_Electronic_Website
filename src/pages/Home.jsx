import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryGrid from '../components/CategoryGrid';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import ProductCard from '../components/ProductCard';
import PromoSplit from '../components/PromoSplit';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SmartImage from '../components/SmartImage';
import TrustBar from '../components/TrustBar';
import useTitle from '../hooks/useTitle';
import { products } from '../utils/catalog';
import { btnLine, btnVolt } from '../utils/styles';

function endOfSunday(now) {
  const target = new Date(now);
  const add = (7 - target.getDay()) % 7;
  target.setDate(target.getDate() + add);
  target.setHours(23, 59, 59, 999);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target.getTime();
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function DealClock() {
  const target = useMemo(() => endOfSunday(new Date()), []);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = Math.max(0, Math.floor((target - now) / 1000));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="rounded-2xl bg-ink px-4 py-3 text-white">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ffb088]">Weekend pricing ends</p>
      <p className="mt-1 font-display text-2xl font-extrabold tabular-nums">
        {pad(days)}d {pad(hours)}h {pad(minutes)}m {pad(secs)}s
      </p>
    </div>
  );
}

export default function Home() {
  useTitle('');
  const deals = products.filter((product) => product.featured);
  const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const speaker = products.find((product) => product.id === 'acc-boom-mini');

  return (
    <>
      <Hero />
      <Marquee />
      <div className="py-3">
        <CategoryGrid />
      </div>

      <section className="py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="This week" title="Prices worth opening the tab for.">
            <div className="flex flex-wrap items-center gap-3">
              <DealClock />
              <Link to="/shop?sort=discount" className={btnLine}>
                All deals
              </Link>
            </div>
          </SectionHeading>
        </Reveal>
        <div className="grid grid-cols-2 gap-1 sm:gap-1.5 lg:grid-cols-4">
          {deals.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <PromoSplit />

      <section className="py-14 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Trending" title="What people keep coming back for.">
            <Link to="/shop?sort=rating" className={btnLine}>
              Top rated
            </Link>
          </SectionHeading>
        </Reveal>
        <div className="grid grid-cols-2 gap-1 sm:gap-1.5 md:grid-cols-3 xl:grid-cols-4">
          {trending.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <Link to="/shop?category=Accessories" className="group relative flex min-h-[300px] items-end overflow-hidden md:min-h-[380px]">
        <SmartImage
          src={speaker?.images[0]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <span className="relative max-w-xl p-6 text-white md:p-12">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ffb088]">Accessories</span>
          <span className="mt-3 block font-display text-4xl font-extrabold leading-[0.95] md:text-6xl">
            The small things that finish a setup.
          </span>
          <span className={`${btnVolt} mt-6`}>Shop accessories</span>
        </span>
      </Link>

      <TrustBar />
    </>
  );
}
