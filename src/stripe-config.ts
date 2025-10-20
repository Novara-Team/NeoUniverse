export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SHgs0HRZQr8tNjmONsFNpTZ',
    name: 'Universe Master Plan',
    description: 'Everything in Plus + Analytics, Recommendations, Priority Support',
    price: 19.00,
    currency: 'usd',
    mode: 'subscription',
  },
  {
    priceId: 'price_1SHgo2HRZQr8tNjmV75zImkN',
    name: 'Creator Plan',
    description: 'Full access to all AI tools, comparisons, and more',
    price: 7.00,
    currency: 'usd',
    mode: 'subscription',
  },
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}