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
                        const mealIds = restaurant.meals
                            ? restaurant.meals.map((mealObj) => mealObj.meal)
                            : [];

                        // Fetch details for each meal
                        const mealDetails = await Promise.all(
                            mealIds.map(async (mealId) => {
                                const mealQuery = query(
                                    mealCollection,
                                    where("id", "==", mealId)
                                );
                                const mealSnapshot = await getDocs(mealQuery);

                                // Check if the document exists and then access data
                                const mealData =
                                    mealSnapshot.docs.length > 0
                                        ? mealSnapshot.docs[0].data()
                                        : null;

                                return mealData
                                    ? {
                                          price: mealData.price,
                                          max_quantity: mealData.max_quantity,
                                          description: mealData.description,
                                      }
                                    : null;
                            })
                        );

                        return {
                            Name: restaurant.name,
                            email: restaurant.email,
                            mealIds: mealIds,
                            mealDetails: mealDetails.filter(
                                (detail) => detail !== null
                            ), // Filter out null values
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
                                (mealDetail, mealIndex) => {
                                    const mealId =
                                        restaurant.mealIds[mealIndex]; // Retrieve mealId for the current meal
                                    return (
                                        <Mealcard
                                            key={mealIndex}
                                            mealId={mealId}
                                            price={
                                                mealDetail
                                                    ? mealDetail.price
                                                    : null
                                            }
                                            maxQuantity={
                                                mealDetail
                                                    ? mealDetail.max_quantity
                                                    : null
                                            }
                                            description={
                                                mealDetail
                                                    ? mealDetail.description
                                                    : null
                                            }
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
