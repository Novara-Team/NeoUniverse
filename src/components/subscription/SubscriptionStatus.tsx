import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { getProductByPriceId } from '../../stripe-config';

export function SubscriptionStatus() {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">No Active Subscription</h3>
        <p className="text-yellow-700">You don't have an active subscription. Choose a plan to get started!</p>
      </div>
    );
  }

  const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;
  const statusColors = {
    active: 'bg-green-50 border-green-200 text-green-800',
    trialing: 'bg-blue-50 border-blue-200 text-blue-800',
    past_due: 'bg-red-50 border-red-200 text-red-800',
    canceled: 'bg-gray-50 border-gray-200 text-gray-800',
    incomplete: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const statusColor = statusColors[subscription.subscription_status as keyof typeof statusColors] || 'bg-gray-50 border-gray-200 text-gray-800';

  return (
    <div className={`border rounded-lg p-6 ${statusColor}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium mb-1">
            {product?.name || 'Subscription'}
          </h3>
          <p className="text-sm opacity-75">
            Status: {subscription.subscription_status.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        {subscription.subscription_status === 'active' && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )}
      </div>

      {subscription.current_period_end && (
        <div className="text-sm opacity-75">
          {subscription.cancel_at_period_end ? 'Expires' : 'Renews'} on:{' '}
          {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
        </div>
      )}

      {subscription.payment_method_brand && subscription.payment_method_last4 && (
        <div className="text-sm opacity-75 mt-2">
          Payment method: {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
        </div>
      )}
    </div>
  );
}