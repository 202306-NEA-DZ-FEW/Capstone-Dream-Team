import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "@/util/firebase";

import { GiShoppingCart } from "react-icons/gi";

const CartIcon = () => {
    const [mealsInCart, setMealsInCart] = useState([]);

    const [totalInCart, setTotalInCart] = useState(null); // Initialize as null

    useEffect(() => {
        // Function to retrieve the unique identifier from the cookie
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        // Retrieve the unique identifier from the cookie
        const visitorID = getCookie("visitorID");

        //const visitorID = "8ddb9194-5002-431d-8851-b70b3ea173b9";

        const fetchMealsInCart = async () => {
            if (visitorID) {
                const cartCollection = collection(db, "cart");
                const q = query(
                    cartCollection,
                    where("donorId", "==", visitorID)
                );
                const querySnapshot = await getDocs(q);
                const mealsData = [];

                let count = 0;
                querySnapshot.forEach((doc) => {
                    const mealData = doc.data();
                    mealsData.push({
                        ...mealData,
                        quantity: 1,
                    });
                    count++; // Increment count for each product
                });

                setMealsInCart(mealsData);

                // Update totalItems with the count after fetching the products
                setTotalInCart(count);
            } else {
                setMealsInCart([]);

                // Reset totalItems to null when the user is not authenticated
                setTotalInCart(null);
            }
        };

        // Initial fetch of products
        fetchMealsInCart();

        const unsubscribe = onSnapshot(collection(db, "cart"), (snapshot) => {
            fetchMealsInCart();
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <button
            type='button'
            className=' p-2 text-[#192655] font-bold  focus:outline-none  focus:ring-white   hover:transform hover:rotate-12 duration-300'
        >
            <GiShoppingCart
                className='h-6 w-6 hover:transform hover:scale-125 duration-300 hover:text-blue-500'
                aria-hidden='true'
            />
            {totalInCart > 0 && (
                <span className='absolute bottom-4  bg-red-500 text-white rounded-full px-1 text-xs'>
                    {totalInCart}
                </span>
            )}
        </button>
    );
};

export default CartIcon;
