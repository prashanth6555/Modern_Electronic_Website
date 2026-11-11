import products from '../data/products.json';

export { products };

export const CATEGORIES = [
  'Mobiles',
  'Laptops',
  'Headphones',
  'Smart TVs',
  'Cameras',
  'Smartwatches',
  'Accessories',
];

export function salePrice(product) {
  return Math.round(product.price * (1 - product.discount / 100));
}

export function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function shippingFor(subtotal) {
  if (subtotal <= 0) return 0;
  return subtotal >= 99 ? 0 : 12;
}

export function productById(id) {
  return products.find((product) => product.id === id);
}
