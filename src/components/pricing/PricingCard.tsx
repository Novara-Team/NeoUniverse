import React, { useState } from 'react';
import { StripeProduct } from '../../stripe-config';
import { createCheckoutSession } from '../../lib/stripe';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
}

export function PricingCard({ product, isPopular = false }: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const { url } = await createCheckoutSession({
        priceId: product.priceId,
        mode: product.mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  return (
    <div className={`relative rounded-2xl border ${
      isPopular 
        ? 'border-indigo-500 shadow-lg scale-105' 
        : 'border-gray-200 shadow-sm'
    } bg-white p-8`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.mode === 'subscription' && (
            <span className="text-gray-500 ml-1">/month</span>
          )}
        </div>
        <p className="text-gray-600 mb-8">{product.description}</p>
        
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isPopular
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400'
              : 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400'
          }`}
        >
          {loading ? 'Processing...' : `Get ${product.name}`}
        </button>
      </div>
    </div>
  );
}