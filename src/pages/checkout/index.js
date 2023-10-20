import React from "react";
import { useState } from "react";
import StripeContainer from "../../components/checkout/StripeContainer";
export default function Checkout() {
    const [showItem, setShowItem] = useState(false);
    return (
        <div className='App'>
            <h1>The Spatula Store</h1>
            {showItem ? (
                <StripeContainer />
            ) : (
                <>
                    <h3>$10.00</h3>

                    <button onClick={() => setShowItem(true)}>
                        Purchase Spatula
                    </button>
                </>
            )}
        </div>
    );
}
