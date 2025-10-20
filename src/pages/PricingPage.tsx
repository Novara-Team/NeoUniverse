import React from 'react';
import { stripeProducts } from '../stripe-config';
import { PricingCard } from '../components/pricing/PricingCard';

export function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stripeProducts.map((product, index) => (
            <PricingCard
              key={product.priceId}
              product={product}
              isPopular={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}