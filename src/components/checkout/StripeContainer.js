import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
export default function Home() {
    return (
        <div>
            <h1>Test Your Payment Integration</h1>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    );
}
