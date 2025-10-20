import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h1>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.email}</span>
              <button
                onClick={signOut}
                className="text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Subscription</h2>
              <SubscriptionStatus />
            </div>
            
            <div className="text-center">
              <Link
                to="/pricing"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}