import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export interface CreateCheckoutSessionParams {
  amount: number;
  donationType: string;
  name: string;
  email: string;
  recurring?: boolean;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export async function createCheckoutSession({
  amount,
  donationType,
  name,
  email,
  recurring = false,
  successUrl,
  cancelUrl,
  metadata = {},
}: CreateCheckoutSessionParams) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${donationType} Donation`,
          description: `Donation to Masjid Madina - ${donationType}`,
        },
        unit_amount: Math.round(amount * 100), // Convert to cents
        ...(recurring && {
          recurring: {
            interval: 'month',
          },
        }),
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: recurring ? 'subscription' : 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: email,
    metadata: {
      donationType,
      donorName: name,
      ...metadata,
    },
  });

  return session;
}

export async function createIftarSponsorshipSession({
  amount,
  date,
  sponsorName,
  email,
  message,
  successUrl,
  cancelUrl,
}: {
  amount: number;
  date: string;
  sponsorName: string;
  email: string;
  message?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Iftar Sponsorship',
            description: `Iftar sponsorship for ${date} at Masjid Madina`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: email,
    metadata: {
      type: 'iftar_sponsorship',
      date,
      sponsorName,
      message: message || '',
    },
  });

  return session;
}
