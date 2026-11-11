import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QtyControl from '../components/QtyControl';
import SmartImage from '../components/SmartImage';
import Stars from '../components/Stars';
import { useCart } from '../context/CartContext';
import useTitle from '../hooks/useTitle';
import { money, productById, products, salePrice } from '../utils/catalog';
import { btnInk, btnLine } from '../utils/styles';

export default function ProductDetails() {
  const { id } = useParams();
  const product = productById(id);
  useTitle(product ? product.name : 'Product');

  if (!product) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-5xl font-extrabold">That piece has left the floor.</h1>
        <Link to="/shop" className={`${btnInk} mt-6`}>
          Back to shop
        </Link>
      </div>
    );
  }

  return <Details key={product.id} product={product} />;
}

function Details({ product }) {
  const { addToCart } = useCart();
  const [photo, setPhoto] = useState(0);
  const [color, setColor] = useState(product.colors[0] || '');
  const [qty, setQty] = useState(1);
  const sale = salePrice(product);
  const saved = product.price - sale;
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return (
    <div className="px-3 py-6 sm:px-4 lg:px-6">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink/50">
        <Link to="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-ink">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-ink">
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-semibold text-ink">{product.name}</span>
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <div className="media-shine aspect-square overflow-hidden rounded-[28px] bg-mist">
            <SmartImage
              src={product.images[photo]}
              alt={`${product.name} photo ${photo + 1}`}
              priority
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setPhoto(index)}
                aria-label={`Show photo ${index + 1}`}
                className={`h-20 w-20 overflow-hidden rounded-2xl border-2 bg-mist ${
                  photo === index ? 'border-ink' : 'border-transparent'
                }`}
              >
                <SmartImage src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-ember">{product.category}</p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">{product.name}</h1>
          <div className="mt-4">
            <Stars value={product.rating} reviews={product.reviews} />
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <p className="text-4xl font-extrabold">{money(sale)}</p>
            <p className="text-lg text-ink/35 line-through">{money(product.price)}</p>
            <span className="rounded-full bg-volt px-3 py-1 text-sm font-extrabold">-{product.discount}%</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-ember">You save {money(saved)}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75">{product.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.highlights.map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold ring-1 ring-ink/10">
                {item}
              </span>
            ))}
          </div>

          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-bold">Color · {color}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setColor(option)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      color === option ? 'bg-ink text-white' : 'bg-white ring-1 ring-ink/15 hover:ring-ink'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyControl value={qty} max={product.stock} onChange={setQty} />
            <button type="button" onClick={() => addToCart(product, qty, color)} className={btnInk}>
              Add to Cart
            </button>
            <Link
              to="/cart"
              onClick={() => addToCart(product, qty, color)}
              className={btnLine}
            >
              Buy now
            </Link>
          </div>
          <p className="mt-3 text-sm text-ink/55">
            {product.stock < 8 ? `Only ${product.stock} left in this finish.` : `${product.stock} in stock. Ships this week.`}
          </p>
        </div>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold">Description</h2>
          <p className="mt-4 leading-relaxed text-ink/75">
            {product.description} VOLT checks every unit before it leaves, covers it for two years, and lists the spec
            the way a person would actually use it.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold">Specifications</h2>
          <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 gap-4 py-3 text-sm">
                <dt className="text-ink/50">{key}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-extrabold">More in {product.category}</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
