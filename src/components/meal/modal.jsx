import Mealcard from "./mealcard";
import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../util/firebase"; // Replace with your Firebase config import

const Modal = ({ currentRestaurantId, isvisible, close }) => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const mealCollection = collection(db, "meal");
            try {
                const mealQuery = query(
                    mealCollection,
                    where("restaurant_id", "==", currentRestaurantId)
                );
                const mealSnapshot = await getDocs(mealQuery);

                const mealDetails = mealSnapshot.docs.map((mealDoc) => {
                    const mealData = mealDoc.data();
                    return {
                        price: mealData.price,
                        maxQuantity: mealData.max_quantity,
                        name: mealData.name,
                    };
                });

                setMeals(mealDetails);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchMeals();
    }, [currentRestaurantId]);

    return (
        <>
            {isvisible ? (
                <div className='mt-10 bg-black bg-opacity-25 flex justify-center items-center flex-col w-full rounded-lg shadow-xl h-auto p-2'>
                    <>
                        <div className='pt-10 pl-10 pr-20 flex justify-center items-center'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'>
                                {meals.map((mealDetail, mealIndex) => (
                                    <Mealcard
                                        key={mealIndex}
                                        price={mealDetail.price}
                                        maxQuantity={mealDetail.maxQuantity}
                                        name={mealDetail.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </>

                    <button
                        className='my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold'
                        onClick={() => close()}
                    >
                        Close
                    </button>
                </div>
            ) : null}
        </>
    );
};

export default Modal;
