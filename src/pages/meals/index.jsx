import Mealcard from "../../components/meal/mealcard";
import Mealbar from "@/components/meal/mealbar";

import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../util/firebase"; // Replace with your Firebase config import

export default function Meals() {
    const [rest, setRest] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const restaurantCollection = collection(db, "restaurant");
            const mealCollection = collection(db, "meal");
            try {
                const querySnapshot = await getDocs(restaurantCollection);
                const data = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const restaurant = doc.data();
                        const restaurantId = doc.id;

                        // Fetch details for each meal using restaurant_id
                        const mealQuery = query(
                            mealCollection,
                            where("restaurant_id", "==", restaurantId)
                        );
                        const mealSnapshot = await getDocs(mealQuery);

                        const mealDetails = mealSnapshot.docs.map((mealDoc) => {
                            const mealData = mealDoc.data();
                            return {
                                price: mealData.price,
                                max_quantity: mealData.max_quantity,
                                description: mealData.description,
                            };
                        });

                        return {
                            Name: restaurant.name,
                            email: restaurant.email,
                            mealDetails: mealDetails,
                        };
                    })
                );
                setRest(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchMeals();
    }, []);

    return (
        <>
            {rest.map((restaurant, index) => (
                <div className='mt-10 pt-10 pb-10' key={index}>
                    <Mealbar name={restaurant.Name} />
                    <div className='pt-10 flex justify-center items-center'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'>
                            {restaurant.mealDetails.map(
                                (mealDetail, mealIndex) => (
                                    <Mealcard
                                        key={mealIndex}
                                        price={mealDetail.price}
                                        maxQuantity={mealDetail.max_quantity}
                                        description={mealDetail.description}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
