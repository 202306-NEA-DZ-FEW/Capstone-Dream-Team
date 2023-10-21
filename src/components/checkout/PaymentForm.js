import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const PaymentForm = () => {
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState(null);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setPaymentLoading(true);

        try {
            const response = await axios.post("/api/create-payment-intent", {
                // Include any necessary data for the payment
            });

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                response.data.client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );
            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === "succeeded") {
                setPaymentSuccess(true);
            }
        } catch (err) {
            setError("An error occurred while processing your payment.");
        } finally {
            setPaymentLoading(false);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Card details:
                    <CardElement />
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type='submit' disabled={paymentLoading}>
                    {paymentLoading ? "Processing..." : "Pay"}
                </button>
            </form>
            {paymentSuccess && (
                <p style={{ color: "green" }}>Payment was successful!</p>
            )}
        </div>
    );
};

export default PaymentForm;
