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
            const mealCollection = collection(db, "meals");
            try {
                const querySnapshot = await getDocs(restaurantCollection);
                const data = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const restaurant = doc.data();
                        const restaurantId = doc.id;

                        // Fetch details for each meal using restaurant_id
                        const mealQuery = query(
                            mealCollection,
                            where("restaurantId", "==", restaurantId)
                        );
                        const mealSnapshot = await getDocs(mealQuery);

                        const mealDetails = mealSnapshot.docs.map((mealDoc) => {
                            const mealData = mealDoc.data();
                            return {
                                price: mealData.price,
                                maxMeals: mealData.maxMeals,
                                name: mealData.name,
                                description: mealData.name,
                                imageUrl: mealData.imageUrl,
                                restaurantId: mealData.restaurantId,
                                quantity: 1,
                            };
                        });

                        return {
                            Name: restaurant.restaurantName,
                            email: restaurant.email,
                            current_restaurant_Id: restaurant.restaurantId,
                            image: restaurant.image,
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
                    <div className=' pl-3 pr-3 '>
                        <Mealbar
                            name={restaurant.Name}
                            current_restaurant_Id={
                                restaurant.current_restaurant_Id
                            }
                            image={restaurant.image}
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
                                            maxMeals={mealDetail.maxMeals}
                                            name={mealDetail.name}
                                            imageUrl={mealDetail.imageUrl}
                                            mealDetail={mealDetail}
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
