import Mealcard from "./mealcard";
import Mealbar from "./mealbar";
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
                                name: mealData.name,
                                description: mealData.description,
                                id: mealData.id,
                            };
                        });

                        return {
                            Name: restaurant.name,
                            email: restaurant.email,
                            current_restaurant_Id: restaurant.uid,
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
        <div>
            {rest.map((restaurant, index) => (
                <div className=' pb-12 pt-3 ' key={index}>
                    <div>
                        <Mealbar
                            name={restaurant.Name}
                            current_restaurant_Id={
                                restaurant.current_restaurant_Id
                            }
                        />
                    </div>
                    <div className='pb-10 pt-5 flex justify-center items-center '>
                        <div className='grid center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 md:gap-10 xl:gap-8'>
                            {restaurant.mealDetails
                                .slice(0, 4)
                                .map((mealDetail, mealIndex) => (
                                    <div
                                        className='flex md:mb-10'
                                        key={mealIndex}
                                    >
                                        <Mealcard
                                            price={mealDetail.price}
                                            maxQuantity={
                                                mealDetail.max_quantity
                                            }
                                            name={mealDetail.name}
                                            mealObject={mealDetail}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
