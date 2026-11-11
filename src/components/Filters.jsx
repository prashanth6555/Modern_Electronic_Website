import { CATEGORIES, products } from '../utils/catalog';

const PRICES = [
  { id: '', label: 'Any price' },
  { id: 'under-100', label: 'Under $100' },
  { id: '100-500', label: '$100 – $500' },
  { id: '500-1500', label: '$500 – $1,500' },
  { id: 'over-1500', label: 'Over $1,500' },
];

export default function Filters({ category, price, rating, onChange, onClear }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-extrabold">Filters</h2>
        <button type="button" onClick={onClear} className="text-sm font-bold text-ember">
          Clear
        </button>
      </div>

      <fieldset>
        <legend className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink/45">Category</legend>
        <div className="mt-3 flex flex-col gap-1">
          <FilterButton active={!category} onClick={() => onChange('category', '')}>
            All gear
            <Count>{products.length}</Count>
          </FilterButton>
          {CATEGORIES.map((name) => (
            <FilterButton key={name} active={category === name} onClick={() => onChange('category', name)}>
              {name}
              <Count>{products.filter((product) => product.category === name).length}</Count>
            </FilterButton>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink/45">Price</legend>
        <div className="mt-3 flex flex-col gap-2">
          {PRICES.map((option) => (
            <label key={option.id || 'any'} className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
              <input
                type="radio"
                name="price"
                checked={price === option.id}
                onChange={() => onChange('price', option.id)}
                className="accent-ember"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={rating === '4'}
          onChange={(event) => onChange('rating', event.target.checked ? '4' : '')}
          className="accent-ember"
        />
        4 stars and up
      </label>
    </div>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
        active ? 'bg-ink text-white' : 'hover:bg-paper'
      }`}
    >
      {children}
    </button>
  );
}

function Count({ children }) {
  return <span className="text-xs opacity-60">{children}</span>;
}
