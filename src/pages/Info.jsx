import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import useTitle from '../hooks/useTitle';
import { btnInk, btnLine, btnVolt } from '../utils/styles';

export function About() {
  useTitle('About Us');
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A shop for people who read the spec sheet."
        text="VOLT started as a counter that refused to upsell a cable you did not need. The catalog got bigger. The rule did not."
      />
      <div className="grid gap-px bg-ink/10 px-0 sm:grid-cols-3">
        {[
          ['2016', 'Opened the first floor'],
          ['48', 'Cities we ship to'],
          ['2 yrs', 'Warranty on hardware'],
        ].map(([stat, label]) => (
          <div key={label} className="bg-paper px-6 py-10">
            <p className="font-display text-5xl font-extrabold">{stat}</p>
            <p className="mt-2 text-sm font-semibold text-ink/60">{label}</p>
          </div>
        ))}
      </div>
      <section className="grid gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3">
        {[
          ['Honest specs', 'We list the battery the way you will live with it, not the lab number on the box.'],
          ['Edited catalog', 'Fewer products, chosen because they earn a place on a desk or in a pocket.'],
          ['People on the line', 'Support is staffed. If a unit is wrong, we say so and fix it.'],
        ].map(([title, text]) => (
          <article key={title} className="rounded-3xl bg-white p-6 shadow-card">
            <h2 className="text-2xl font-extrabold">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

export function Contact() {
  useTitle('Contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Tell us who to reply to.';
    if (!form.email.includes('@')) next.email = 'That email does not look right.';
    if (form.message.trim().length < 10) next.message = 'Give us a little more detail.';
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to the floor."
        text="Orders, product questions, press. We read everything that lands here."
      />
      <div className="grid gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {sent ? (
          <div className="rounded-[28px] bg-white p-8 shadow-card">
            <h2 className="text-4xl font-extrabold">Got it.</h2>
            <p className="mt-3 text-ink/70">
              Thanks, {form.name.split(' ')[0]}. This demo keeps the note on this device only. A real shop would reply
              from hello@volt.store.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 rounded-[28px] bg-white p-6 shadow-card" noValidate>
            <Field label="Name" name="name" value={form.name} onChange={onChange} error={errors.name} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
            <label className="block text-sm font-semibold">
              Message
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={onChange}
                className="mt-1 w-full rounded-2xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ember"
              />
              {errors.message && <span className="mt-1 block text-xs text-ember">{errors.message}</span>}
            </label>
            <button type="submit" className={btnVolt}>
              Send message
            </button>
          </form>
        )}
        <aside className="space-y-4">
          <InfoCard title="Email" text="hello@volt.store" href="mailto:hello@volt.store" />
          <InfoCard title="Phone" text="+1 (415) 555-0198" href="tel:+14155550198" />
          <InfoCard title="Floor" text="120 Market Street, San Francisco, CA. Weekdays 9–6 Pacific." />
        </aside>
      </div>
    </>
  );
}

export function Support() {
  useTitle('Customer Support');
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);

  const track = (event) => {
    event.preventDefault();
    if (orderId.trim().length < 4) {
      setStatus({ ok: false, text: 'Order numbers look like VL-184220.' });
      return;
    }
    setStatus({
      ok: true,
      text: `${orderId.trim().toUpperCase()} is in transit. Demo tracking shows it arriving Thursday.`,
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Customer support"
        title="Tell us what went sideways."
        text="Tracking, returns, and warranty live here. If it is urgent, call the floor."
      />
      <div className="grid gap-4 px-4 py-12 sm:px-6 md:grid-cols-3">
        <article className="rounded-[28px] bg-white p-6 shadow-card md:col-span-1">
          <h2 className="text-2xl font-extrabold">Track an order</h2>
          <form onSubmit={track} className="mt-4 space-y-3">
            <input
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="VL-184220"
              className="w-full rounded-full border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ember"
            />
            <button type="submit" className={btnInk}>
              Check status
            </button>
          </form>
          {status && (
            <p className={`mt-4 text-sm font-semibold ${status.ok ? 'text-ink' : 'text-ember'}`}>{status.text}</p>
          )}
        </article>
        <HelpCard title="Start a return" text="30 days, original box, and we will email a label." to="/contact" />
        <HelpCard title="Warranty" text="Two years on hardware. Read the short version in FAQs." to="/faq" />
      </div>
    </>
  );
}

const FAQS = [
  ['How fast do you ship?', 'Orders placed on a weekday morning leave the same week. Free shipping starts at $99. Under that, shipping is a flat $12.'],
  ['What is your return policy?', 'You have 30 days. The product should be in the box it arrived in, with the bits you did not mean to keep. Start a return from Contact.'],
  ['How does the warranty work?', 'Every device includes two years of hardware coverage. We repair or replace. Accessories are covered for one year.'],
  ['Do you take real payments here?', 'This is a demo store. Checkout confirms an order on this device and does not charge a card.'],
  ['Can I change an order after it is placed?', 'Write to support with the order number. If it has not left the building, we can still edit it.'],
  ['Do you price-match phones?', 'Yes, on current flagship phones from a listed retailer in the same country. Send the link and we will look the same day.'],
];

export function Faq() {
  useTitle('FAQs');
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHero eyebrow="FAQs" title="Short answers, no maze." text="Shipping, returns, warranty, and the demo checkout." />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {FAQS.map(([question, answer], index) => {
          const expanded = open === index;
          return (
            <div key={question} className="border-b border-ink/10">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-lg font-extrabold">{question}</span>
                <span className={`text-2xl transition ${expanded ? 'rotate-45' : ''}`} aria-hidden="true">
                  +
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm leading-relaxed text-ink/70">{answer}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/contact" className={btnVolt}>
            Still stuck? Contact us
          </Link>
          <Link to="/support" className={btnLine}>
            Customer support
          </Link>
        </div>
      </div>
    </>
  );
}

export function NotFound() {
  useTitle('Not found');
  return (
    <div className="px-4 py-24 text-center">
      <p className="font-display text-7xl font-extrabold">404</p>
      <h1 className="mt-2 text-3xl font-extrabold">This aisle does not exist.</h1>
      <Link to="/" className={`${btnInk} mt-6`}>
        Go home
      </Link>
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
        className="mt-1 w-full rounded-2xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ember"
      />
      {error && <span className="mt-1 block text-xs text-ember">{error}</span>}
    </label>
  );
}

function InfoCard({ title, text, href }) {
  const body = (
    <>
      <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-ink/40">{title}</h2>
      <p className="mt-2 text-lg font-bold">{text}</p>
    </>
  );
  if (!href) return <div className="rounded-3xl bg-white p-5 shadow-card">{body}</div>;
  return (
    <a href={href} className="block rounded-3xl bg-white p-5 shadow-card transition hover:-translate-y-0.5">
      {body}
    </a>
  );
}

function HelpCard({ title, text, to }) {
  return (
    <Link to={to} className="rounded-[28px] bg-white p-6 shadow-card transition hover:-translate-y-1">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">{text}</p>
    </Link>
  );
}
