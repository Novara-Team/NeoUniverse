# Stripe Setup Guide for AI Universe

This guide will help you configure Stripe for the subscription system.

## Prerequisites

You already have your Stripe test keys configured in the `.env` file:
- Public Key: `pk_test_51SHSO4HRZQr8tNjmsQ3duVztF2TLYJCEEaibvWBKZDYMFZu8E9Y6gLBfT11USrNYYMxGHF65kDGyTwiojvSPpXvz00hgWylboU`
- Secret Key: `sk_test_51SHSO4HRZQr8tNjmsQ3duVztF2TLYJCEEaibvWBKZDYMFZu8E9Y6gLBfT11USrNYYMxGHF65kDGyTwiojvSPpXvz00EYpQ5PSl`

## Step 1: Create Products and Prices in Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/products)

2. Click "Add Product" and create two products:

### Plus Plan
- **Name**: Creator Plan
- **Description**: Full access to all AI tools, comparisons, and more
- **Pricing**:
  - Click "Add pricing"
  - Price: $7.00 USD
  - Billing period: Monthly
  - After creating, copy the Price ID (starts with `price_`)
  - Update the Price ID in `supabase/functions/stripe-checkout/index.ts`:
    ```typescript
    const PRICE_IDS: Record<string, string> = {
      plus: 'price_YOUR_PLUS_PRICE_ID_HERE',  // Replace this
      pro: 'price_pro_monthly',
    };
    ```

### Pro Plan
- **Name**: Universe Master Plan
- **Description**: Everything in Plus + Analytics, Recommendations, Priority Support
- **Pricing**:
  - Click "Add pricing"
  - Price: $19.00 USD
  - Billing period: Monthly
  - After creating, copy the Price ID (starts with `price_`)
  - Update the Price ID in `supabase/functions/stripe-checkout/index.ts`:
    ```typescript
    const PRICE_IDS: Record<string, string> = {
      plus: 'price_plus_monthly',
      pro: 'price_YOUR_PRO_PRICE_ID_HERE',  // Replace this
    };
    ```

## Step 2: Configure Webhook (Optional but Recommended)

Webhooks allow Stripe to notify your app when subscriptions change.

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL:
   ```
   https://YOUR_SUPABASE_PROJECT.supabase.co/functions/v1/stripe-webhook
   ```
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_`)
7. Add it to your Supabase project secrets:
   - Go to Supabase Dashboard > Settings > Edge Functions
   - Add secret: `STRIPE_WEBHOOK_SECRET` = `whsec_YOUR_SECRET_HERE`

## Step 3: Enable Google OAuth (Optional)

To enable Google Sign-In:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Authentication > Providers
4. Enable Google provider
5. Follow the instructions to create OAuth credentials in Google Cloud Console
6. Add the credentials to Supabase

## Step 4: Apply Database Migration

The subscription system requires database tables. Apply the migration:

1. The migration file is already created at: `supabase/migrations/20251013_add_subscriptions.sql`
2. This will be automatically applied when you use the Supabase dashboard or CLI

## Testing the System

### Test User Registration
1. Go to `/register`
2. Create a new account with email/password
3. You should be automatically logged in and see "Free" plan in the header

### Test Subscription Upgrade
1. Go to `/pricing`
2. Click "Upgrade Now" on Plus or Pro plan
3. You'll be redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
5. Any future date for expiry
6. Any 3 digits for CVC
7. Any ZIP code
8. Complete the purchase
9. You should be redirected back and see your plan updated in the header

### Test Stripe Webhooks (if configured)
1. Complete a test purchase
2. Go to Stripe Dashboard > Webhooks
3. Click on your endpoint
4. You should see successful webhook events

## Features by Plan

### Free Plan (Explorer)
- Access to 100 AI tools
- Read reviews only
- Save up to 3 favorites
- Limited news access (top 5)
- Monthly email updates

### Plus Plan (Creator) - $7/month
- Full access to all AI tools
- Write reviews and comments
- Unlimited favorites
- Full AI News
- Tool comparison page
- Submit new tools
- "Plus Member" badge

### Pro Plan (Universe Master) - $19/month
- Everything in Plus
- Personal Analytics Dashboard
- Smart AI Recommendations
- Exclusive newsletter
- Export reports (CSV/PDF)
- Priority support
- Exclusive discounts
- "PRO Member" golden badge
- Beta tools access

## Troubleshooting

### Issue: Checkout doesn't work
- Verify Price IDs are correctly set in `stripe-checkout/index.ts`
- Check browser console for errors
- Ensure Supabase Edge Function is deployed

### Issue: Subscription not updating after payment
- Check webhook is configured correctly
- Verify webhook secret is added to Supabase
- Check Supabase logs for webhook errors

### Issue: Google Sign-In doesn't work
- Verify Google OAuth is enabled in Supabase
- Check OAuth credentials are correctly configured
- Ensure redirect URLs are whitelisted in Google Cloud Console

## Production Deployment

When moving to production:

1. Replace test keys with live keys in `.env`:
   - `VITE_STRIPE_PUBLIC_KEY` = your live publishable key
   - `STRIPE_SECRET_KEY` = your live secret key (in Supabase secrets)

2. Create live products in Stripe Dashboard (not test mode)

3. Update Price IDs in `stripe-checkout/index.ts` with live price IDs

4. Configure webhook with production URL

5. Test thoroughly before launch!

## Support

For issues or questions:
- Check Supabase logs for errors
- Review Stripe Dashboard for payment/webhook issues
- Ensure all environment variables are correctly set
