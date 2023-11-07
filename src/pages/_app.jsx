import { appWithTranslation } from "next-i18next";

import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Elements stripe={stripePromise}>
                <Component {...pageProps} />
            </Elements>
        </>
    );
}

export default appWithTranslation(MyApp);
