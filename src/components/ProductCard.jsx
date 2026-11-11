import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { money, salePrice } from '../utils/catalog';
import SmartImage from './SmartImage';
import Stars from './Stars';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  const sale = salePrice(product);
  const cover = product.images[0];

  useEffect(() => () => clearTimeout(timer.current), []);

  const onAdd = () => {
    addToCart(product, 1, product.colors?.[0] || '');
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1000);
  };

  return (
    <article
      className="group flex h-full animate-fade-up flex-col overflow-hidden rounded-3xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(18,18,18,0.45)]"
      style={{ animationDelay: `${Math.min(index, 10) * 55}ms` }}
    >
      <Link to={`/product/${product.id}`} className="media-shine block aspect-square bg-mist">
        <SmartImage
          src={cover}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 z-10 rounded-full bg-volt px-2.5 py-1 text-[11px] font-extrabold text-ink">
          -{product.discount}%
        </span>
        {product.tag && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white">
            {product.tag}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/40">{product.category}</p>
        <Link to={`/product/${product.id}`} className="mt-1 line-clamp-2 min-h-[3rem] text-base font-extrabold leading-tight">
          {product.name}
        </Link>
        <div className="mt-2">
          <Stars value={product.rating} reviews={product.reviews} />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-extrabold">{money(sale)}</span>
          <span className="text-sm text-ink/35 line-through">{money(product.price)}</span>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className={`mt-4 w-full rounded-full py-2.5 text-sm font-bold transition duration-300 active:scale-[0.98] ${
            added ? 'bg-volt text-ink' : 'bg-ink text-white hover:bg-volt hover:text-ink'
          }`}
        >
          {added ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
