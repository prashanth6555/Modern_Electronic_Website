import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IconCart, IconGrid, IconHeadset, IconHome } from './Icons';

export default function MobileNav() {
  const { pathname } = useLocation();
  const { count } = useCart();
  const shopActive = pathname.startsWith('/shop') || pathname.startsWith('/product');

  const item = (active) =>
    `flex flex-col items-center gap-1 py-2 text-[11px] font-bold ${active ? 'text-ember' : 'text-ink/45'}`;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-ink/10 bg-white/95 backdrop-blur md:hidden"
      aria-label="Mobile"
    >
      <Link to="/" className={item(pathname === '/')}>
        <IconHome />
        Home
      </Link>
      <Link to="/shop" className={item(shopActive)}>
        <IconGrid />
        Shop
      </Link>
      <Link to="/support" className={item(pathname === '/support')}>
        <IconHeadset />
        Support
      </Link>
      <Link to="/cart" className={item(pathname === '/cart')}>
        <span className="relative">
          <IconCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-volt px-1 text-[10px] font-extrabold text-ink">
              {count}
            </span>
          )}
        </span>
        Cart
      </Link>
    </nav>
  );
}
