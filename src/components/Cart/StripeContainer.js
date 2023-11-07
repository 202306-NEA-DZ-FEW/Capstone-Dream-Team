import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import Checkout from "./checkout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
export default function Home() {
    return (
        <div>
            <h1>Test Your Payment Integration</h1>
            <Elements useStripe={useStripe} stripe={stripePromise}>
                <Checkout />
            </Elements>
        </div>
    );
}
