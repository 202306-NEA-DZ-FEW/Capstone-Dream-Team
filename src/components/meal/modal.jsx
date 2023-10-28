import Mealcard from "./mealcard";
import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../util/firebase"; // Replace with your Firebase config import

const Modal = ({ currentRestaurantId }) => {
    const [meals, setMeals] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const hideModal = () => {
        setModalVisible(false);
    };

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
        <div>
            {/* Modal toggle */}
            <button
                data-modal-target='default-modal'
                data-modal-toggle='default-modal'
                className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus-ring-blue-800'
                type='button'
                onClick={toggleModal}
            >
                Show All Meals
            </button>

            {/* Main modal */}
            {isModalVisible && (
                <div
                    id='default-modal'
                    tabIndex='-1'
                    aria-hidden='true'
                    className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
                >
                    <div className='relative w-full max-h-full'>
                        {/* Modal content */}
                        <div className='relative bg-white border-4 border-blue-500 rounded-lg shadow dark:bg-gray-700'>
                            {/* TITLE & HIDE X */}
                            <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    {" "}
                                    Available Meals{" "}
                                </h3>
                                <button
                                    type='button'
                                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white'
                                    data-modal-hide='default-modal'
                                    onClick={hideModal}
                                >
                                    <svg
                                        className='w-3 h-3'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 14 14'
                                    >
                                        <path
                                            stroke='currentColor'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className='p-6 space-y-6'>
                                <div className='pt-10 pl-10 pr-20 pb-20 flex justify-center items-center'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'>
                                        {meals.map((mealDetail, mealIndex) => (
                                            <Mealcard
                                                key={mealIndex}
                                                price={mealDetail.price}
                                                maxQuantity={
                                                    mealDetail.maxQuantity
                                                }
                                                name={mealDetail.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
