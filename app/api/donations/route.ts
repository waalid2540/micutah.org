import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, category, isRecurring, name, email, phone } = body;

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 }
      );
    }

    // Create metadata for the donation
    const metadata = {
      category: category || "sadaqah",
      donorName: name || "Anonymous",
      donorEmail: email || "",
      donorPhone: phone || "",
      source: "micutah.org",
    };

    if (isRecurring) {
      // Create a recurring subscription
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Monthly ${category || "Sadaqah"} Donation`,
                description: `Monthly donation to Madina Islamic Center - ${category}`,
              },
              unit_amount: Math.round(amount * 100), // Stripe uses cents
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        customer_email: email || undefined,
        metadata,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://micutah.org'}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://micutah.org'}/donate?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Create a one-time payment
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${category || "Sadaqah"} Donation`,
                description: `One-time donation to Madina Islamic Center - ${category}`,
              },
              unit_amount: Math.round(amount * 100), // Stripe uses cents
            },
            quantity: 1,
          },
        ],
        customer_email: email || undefined,
        metadata,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://micutah.org'}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://micutah.org'}/donate?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
