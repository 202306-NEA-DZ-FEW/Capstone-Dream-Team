import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore functions
import React, { useEffect, useState } from "react";

import { db } from "../../util/firebase"; // Replace with your Firebase config import
export default function Sponsors() {
    const [rest, setRest] = useState([]);
    useEffect(() => {
        async function fetchMeals() {
            const restaurantCollection = collection(db, "restaurant");

            try {
                const querySnapshot = await getDocs(restaurantCollection);
                const data = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const restaurant = doc.data();

                        // Fetch details for each meal using restaurant_id

                        return {
                            Name: restaurant.restaurantName,
                            email: restaurant.email,
                            image: restaurant.image,
                        };
                    })
                );
                const restaurant = data.slice(0, 4);
                setRest(restaurant);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchMeals();
    }, []);
    return (
        <>
            <div class='max-w-screen-xl mx-auto flex h-full  my-20 py-20 items-center justify-center  bg-[#BCE4EB]'>
                <div class='w-full rounded-lg bg-white px-8 py-4 shadow-md m-4'>
                    <div class='px-1 py-4'>
                        <h3 className=' mb-6 font-sans text-2xl text-center font-bold leading-none tracking-tight text-[#192655] sm:text-3xl md:mx-auto'>
                            Our sponsors
                        </h3>
                    </div>
                    <ul class='grid grid-cols-4 gap-2 px-1'>
                        {rest.map((restaurant, index) => (
                            <li
                                className='flex items-center flex-col '
                                key={index}
                            >
                                <img
                                    src={restaurant.image}
                                    alt='restaurant'
                                    class='rounded-full w-16 h-16 object-cover'
                                />
                                <h5 class='font-semibold mt-2'>
                                    {restaurant.Name}
                                </h5>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
