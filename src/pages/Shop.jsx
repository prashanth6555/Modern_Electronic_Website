import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import useTitle from '../hooks/useTitle';
import { products, salePrice } from '../utils/catalog';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'discount', label: 'Biggest discount' },
];

function inPrice(product, price) {
  const sale = salePrice(product);
  if (price === 'under-100') return sale < 100;
  if (price === '100-500') return sale >= 100 && sale <= 500;
  if (price === '500-1500') return sale > 500 && sale <= 1500;
  if (price === 'over-1500') return sale > 1500;
  return true;
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const category = params.get('category') || '';
  const price = params.get('price') || '';
  const rating = params.get('rating') || '';
  const sort = params.get('sort') || 'featured';
  const [text, setText] = useState(query);
  const [mobileFilters, setMobileFilters] = useState(false);

  useTitle(category ? category : 'Shop');

  useEffect(() => {
    setText(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParams(
        (prev) => {
          const current = prev.get('q') || '';
          if (current === text) return prev;
          const next = new URLSearchParams(prev);
          if (text) next.set('q', text);
          else next.delete('q');
          return next;
        },
        { replace: true }
      );
    }, 280);
    return () => clearTimeout(timer);
  }, [text, setParams]);

  const setParam = (key, value) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === 'featured') next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  };

  const clear = () => {
    setText('');
    setParams(new URLSearchParams(), { replace: true });
  };

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list = products.filter((product) => {
      const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesCategory = !category || product.category === category;
      const matchesRating = rating === '4' ? product.rating >= 4 : true;
      return matchesQuery && matchesCategory && matchesRating && inPrice(product, price);
    });

    if (sort === 'price-asc') list = [...list].sort((a, b) => salePrice(a) - salePrice(b));
    else if (sort === 'price-desc') list = [...list].sort((a, b) => salePrice(b) - salePrice(a));
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === 'discount') list = [...list].sort((a, b) => b.discount - a.discount || b.rating - a.rating);
    return list;
  }, [query, category, price, rating, sort]);

  const title = category || (query ? `Results for “${query}”` : 'Shop electronics');

  return (
    <>
      <PageHero
        eyebrow="The floor"
        title={title}
        text="Search the catalog, narrow by category or price, and sort until the right piece is sitting on top."
      >
        <form
          className="mt-6 max-w-xl"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block">
            <span className="sr-only">Search products</span>
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Try OLED, laptop, camera..."
              className="w-full rounded-full bg-white/10 px-5 py-3 text-sm text-white outline-none ring-1 ring-white/20 placeholder:text-white/45 focus:ring-volt"
            />
          </label>
        </form>
      </PageHero>

      <div className="flex items-start gap-4 px-2 py-6 sm:px-3">
        <aside className="sticky top-20 hidden w-64 shrink-0 md:block">
          <Filters category={category} price={price} rating={rating} onChange={setParam} onClear={clear} />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink/60">
              {results.length} {results.length === 1 ? 'piece' : 'pieces'}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-bold md:hidden"
                onClick={() => setMobileFilters(true)}
              >
                Filters
              </button>
              <label className="text-sm font-semibold">
                <span className="sr-only">Sort products</span>
                <select
                  value={sort}
                  onChange={(event) => setParam('sort', event.target.value)}
                  className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-bold outline-none"
                >
                  {SORTS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="rounded-3xl bg-white px-6 py-20 text-center">
              <h2 className="text-4xl font-extrabold">Nothing in that corner.</h2>
              <p className="mt-3 text-ink/60">Try another word, or clear the filters and start wide.</p>
              <button type="button" onClick={clear} className="mt-6 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">
                Clear filters
              </button>
            </div>
          ) : (
            <div
              key={`${category}-${sort}-${query}-${price}-${rating}`}
              className="grid grid-cols-2 gap-1 sm:gap-1.5 xl:grid-cols-3 2xl:grid-cols-4"
            >
              {results.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`fixed inset-0 z-[60] md:hidden ${mobileFilters ? '' : 'pointer-events-none'}`} aria-hidden={!mobileFilters}>
        <button
          type="button"
          aria-label="Close filters"
          className={`absolute inset-0 bg-black/50 transition ${mobileFilters ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileFilters(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-[min(100%,360px)] overflow-y-auto bg-white p-5 pb-24 transition duration-300 ${
            mobileFilters ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Filters
            category={category}
            price={price}
            rating={rating}
            onChange={(key, value) => {
              setParam(key, value);
            }}
            onClear={() => {
              clear();
              setMobileFilters(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
