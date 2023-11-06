import stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeInstance = new stripe(stripeSecretKey);

export default async function createPaymentIntent(req, res) {
    if (req.method === "POST") {
        try {
            // Create a PaymentIntent using the Stripe API
            const paymentIntent = await stripeInstance.paymentIntents.create({
                amount: 9000,
                currency: "usd",
                description: "Product purchase",
                payment_method: "pm_card_visa",
                payment_method_types: ["card"],
                metadata: {
                    order_id: "12345",
                },
            });
            // Send the client secret in the server response
            res.json(paymentIntent);
        } catch (error) {
            res.json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
