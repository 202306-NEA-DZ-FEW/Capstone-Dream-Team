import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
    "pk_test_51O2uhkIExYYb8pMa1rn36VYdsm0nF5KYv2s53vkRoDSXwN5k4hYhjFYkiKAedLNOCHwtEfkbCPH2Bl6ibmYRySMS00MVCbfcu4";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    );
}
