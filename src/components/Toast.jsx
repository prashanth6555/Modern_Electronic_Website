import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[80] flex justify-center px-3 md:bottom-6 md:justify-end md:px-6">
      <div
        key={toast.id}
        role="status"
        className="pointer-events-auto flex animate-fade-up items-center gap-4 rounded-full bg-ink px-4 py-3 text-sm text-white shadow-2xl"
      >
        <span className="max-w-[220px] truncate sm:max-w-xs">{toast.message}</span>
        <Link to="/cart" className="font-extrabold text-volt">
          View cart
        </Link>
      </div>
    </div>
  );
}
