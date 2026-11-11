import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Home from './pages/Home';
import { About, Contact, Faq, NotFound, Support } from './pages/Info';
import ProductDetails from './pages/ProductDetails';
import Shop from './pages/Shop';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Frame() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <ScrollToTop />
      <main id="content" key={pathname} className={`w-full flex-1 ${pathname === '/' ? '' : 'pt-16'} pb-16 md:pb-0`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Frame />
      </CartProvider>
    </BrowserRouter>
  );
}
