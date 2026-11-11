import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QtyControl from '../components/QtyControl';
import SmartImage from '../components/SmartImage';
import { useCart } from '../context/CartContext';
import useTitle from '../hooks/useTitle';
import { money, salePrice } from '../utils/catalog';
import { btnInk, btnLine, btnVolt } from '../utils/styles';

const EMPTY = { name: '', email: '', address: '', city: '' };

export default function Cart() {
  const { lines, count, subtotal, shipping, total, updateQty, remove, clear } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);
  useTitle('Cart');

  useEffect(() => {
    if (order) window.scrollTo(0, 0);
  }, [order]);

  if (order) return <Confirmation order={order} />;
  if (!lines.length) return <EmptyCart />;

  const goal = 99;
  const progress = Math.min(100, (subtotal / goal) * 100);
  const remaining = Math.max(0, goal - subtotal);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Add the name for the parcel.';
    if (!form.email.includes('@') || !form.email.includes('.')) next.email = 'We need a valid email for the receipt.';
    if (form.address.trim().length < 5) next.address = 'Add a street address.';
    if (form.city.trim().length < 2) next.city = 'Add a city.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setOrder({
      id: `VL-${Math.floor(100000 + Math.random() * 900000)}`,
      lines: lines.map((line) => ({ ...line })),
      total,
      email: form.email.trim(),
      name: form.name.trim(),
    });
    clear();
  };

  return (
    <div className="px-3 py-8 sm:px-4 lg:px-6">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h1 className="text-4xl font-extrabold md:text-6xl">Your cart</h1>
          <p className="mt-2 text-ink/60">
            {count} {count === 1 ? 'item' : 'items'}
          </p>
          <ul className="mt-6 divide-y divide-ink/10">
            {lines.map((line, index) => {
              const sale = salePrice(line);
              return (
                <li
                  key={`${line.id}-${line.color}`}
                  className="flex animate-fade-up gap-4 py-5"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <Link
                    to={`/product/${line.id}`}
                    className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-mist"
                  >
                    <SmartImage src={line.images[0]} alt={line.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link to={`/product/${line.id}`} className="font-extrabold hover:text-ember">
                          {line.name}
                        </Link>
                        <p className="text-sm text-ink/50">
                          {line.category}
                          {line.color ? ` · ${line.color}` : ''}
                        </p>
                      </div>
                      <p className="font-extrabold">{money(sale * line.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <QtyControl
                        value={line.qty}
                        max={line.stock}
                        onChange={(qty) => updateQty(line.id, line.color, qty)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(line.id, line.color)}
                        className="text-sm font-bold text-ink/45 transition hover:text-ember"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="rounded-[28px] bg-white p-5 shadow-card lg:sticky lg:top-24">
          <h2 className="text-2xl font-extrabold">Summary</h2>
          <div className="mt-4">
            <div className="h-1.5 overflow-hidden rounded-full bg-mist">
              <div className="h-full rounded-full bg-volt transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs font-semibold text-ink/60">
              {remaining === 0 ? 'You have unlocked free shipping.' : `Add ${money(remaining)} more for free shipping.`}
            </p>
          </div>
          <dl className="mt-5 space-y-2 text-sm">
            <Row label="Subtotal" value={money(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? 'Free' : money(shipping)} />
            <div className="flex items-center justify-between border-t border-ink/10 pt-3 text-base font-extrabold">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>

          <form onSubmit={placeOrder} className="mt-6 space-y-3" noValidate>
            <p className="text-xs leading-relaxed text-ink/50">
              Demo checkout. Nothing is charged and no payment details are collected.
            </p>
            <Field label="Full name" name="name" value={form.name} onChange={onChange} error={errors.name} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
            <Field label="Address" name="address" value={form.address} onChange={onChange} error={errors.address} />
            <Field label="City" name="city" value={form.city} onChange={onChange} error={errors.city} />
            <button type="submit" className={`${btnVolt} w-full`}>
              Place demo order
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink/55">{label}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}

function Field({ label, name, value, onChange, error, type = 'text' }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-2xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none ring-ember focus:ring-2"
      />
      {error && <span className="mt-1 block text-xs font-semibold text-ember">{error}</span>}
    </label>
  );
}

function EmptyCart() {
  return (
    <div className="px-4 py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-ink/10">0</p>
      <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">Your cart is empty.</h1>
      <p className="mx-auto mt-3 max-w-md text-ink/60">The good stuff is still on the floor. Phones, audio, cameras, the lot.</p>
      <Link to="/shop" className={`${btnInk} mt-8`}>
        Start shopping
      </Link>
    </div>
  );
}

function Confirmation({ order }) {
  return (
    <div className="relative overflow-hidden px-4 py-20 text-center">
      {Array.from({ length: 18 }, (_, index) => (
        <span
          key={index}
          className="confetti"
          style={{
            left: `${(index * 53) % 100}%`,
            animationDelay: `${index * 0.04}s`,
            background: index % 2 ? '#FF5A1F' : '#121212',
          }}
        />
      ))}
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ember">Order placed</p>
      <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">It is on the list, {order.name.split(' ')[0]}.</h1>
      <p className="mx-auto mt-4 max-w-lg text-ink/65">
        Demo order <span className="font-extrabold text-ink">{order.id}</span> for {money(order.total)}. A pretend receipt
        would land at {order.email}. No payment was taken.
      </p>
      <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm">
        {order.lines.map((line) => (
          <li key={`${line.id}-${line.color}`} className="flex justify-between gap-3 border-b border-ink/10 py-2">
            <span>
              {line.name} × {line.qty}
            </span>
            <span className="font-bold">{money(salePrice(line) * line.qty)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className={btnInk}>
          Back home
        </Link>
        <Link to="/shop" className={btnLine}>
          Keep browsing
        </Link>
      </div>
    </div>
  );
}
