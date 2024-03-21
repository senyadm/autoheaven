// pages/api/create-payment-intent.js

import Stripe from 'stripe';
import  { NextResponse } from 'next/server';
// Initialize Stripe with your secret key
const stripe = new Stripe("sk_test_51OvY7V04EX91HcTe8vvPZtXDohTrRw43SMTVitYDEyLA57ER7uD7EiVehG104SgGLwMaoZPIjsOVBBXJFxGv7Awx00znharVVw", {
    apiVersion: '2023-10-16',
  });

  export async function POST(req: Request, res: any) {
  if (req.method === 'POST') {
    const { amount } = await req.json();

    console.log('REQ BODY', amount)

    try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
      });

      console.log(paymentIntent)

      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      console.error(err);
      return NextResponse.error();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
