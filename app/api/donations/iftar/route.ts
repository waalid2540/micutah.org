import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const IFTAR_PRICE = 150; // $150 per night

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nights, name, email, phone, anonymous } = body;

    if (!nights || !Array.isArray(nights) || nights.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one night" },
        { status: 400 }
      );
    }

    const totalAmount = nights.length * IFTAR_PRICE;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Iftar Sponsorship - ${nights.length} night(s)`,
              description: `Ramadan Iftar sponsorship for: ${nights.join(", ")}`,
            },
            unit_amount: IFTAR_PRICE * 100, // $150 in cents
          },
          quantity: nights.length,
        },
      ],
      customer_email: email || undefined,
      metadata: {
        type: "iftar_sponsorship",
        nights: JSON.stringify(nights),
        sponsorName: anonymous ? "Anonymous" : (name || "Anonymous"),
        sponsorEmail: email || "",
        sponsorPhone: phone || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://micutah.org'}/ramadan/iftar-sponsor/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://micutah.org'}/ramadan/iftar-sponsor?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe iftar error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
