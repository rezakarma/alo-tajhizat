import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (orderPrice: number): Promise<number> => {
  const dollarRateResult = await fetch("https://www.megaweb.ir/api/money");
  console.log(dollarRateResult, " dollarRateResult");
  const dollarRateResponse = await dollarRateResult.json();
  if (!dollarRateResponse.sell_usd) {
    return Math.round((orderPrice / 50000) * 100);
  }

  return Math.round(
    (orderPrice /
      Math.floor(
        Number(dollarRateResponse.sell_usd.price.replace(",", "")) / 10
      )) *
      100
  );
};

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { orderId } = await request.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (order.stripePayment) {
      return NextResponse.json({
        success: true,
        clientSecret: order.stripePayment.client_secret,
      });
    } else {
      const amount = await calculateOrderAmount(order.price);
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.update({
        where: { id: orderId },
        data: {
          stripePayment: {
            id: paymentIntent.id,
            client_secret: paymentIntent.client_secret,
            amount: paymentIntent.amount,
            status: paymentIntent.status,
          },
        },
      });

      console.log("paymentIntent: ", paymentIntent);
      return NextResponse.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: "در هنگام ساخت پرداخت خطایی رخ داده است",
    });
  }
}
