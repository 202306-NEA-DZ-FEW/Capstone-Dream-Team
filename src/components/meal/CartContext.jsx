import React, { createContext, useContext, useReducer } from "react";

// Create the context
const CartContext = createContext();

// Reducer function to handle state updates
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return [...state, action.payload];
        case "REMOVE_FROM_CART":
            return state.filter((item) => item.id !== action.payload.id);
        // Add more cases as needed for your application
        default:
            return state;
    }
};

// CartProvider component to wrap the app and provide the context
const CartProvider = ({ children }) => {
    // Use useReducer hook to manage the state and actions
    const [cartState, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to consume the CartContext
const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export { CartProvider, useCart };
