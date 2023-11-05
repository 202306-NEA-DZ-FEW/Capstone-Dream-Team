import Mealcard from "./mealcard";
import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../util/firebase"; // Replace with your Firebase config import
import { useTranslation } from "next-i18next";

const Modal = ({ currentRestaurantId }) => {
    const [meals, setMeals] = useState([]);
    const { t } = useTranslation("common");

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const hideModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        async function fetchMeals() {
            const mealCollection = collection(db, "meals");
            try {
                const mealQuery = query(
                    mealCollection,
                    where("restaurantId", "==", currentRestaurantId)
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
            {}
            <button
                data-modal-target='default-modal'
                data-modal-toggle='default-modal'
                className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus-ring-blue-800'
                type='button'
                onClick={toggleModal}
            >
                {t("mealsPage.show_meals")}
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
                                    {t("mealsPage.available_meals")}{" "}
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
                                <div className='pb-10 pt-5 flex justify-center items-center'>
                                    <div className='grid center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 md:gap-10 xl:gap-8'>
                                        {meals.map((mealDetail, mealIndex) => (
                                            <div
                                                className='flex md:mb-10'
                                                key={mealIndex}
                                            >
                                                <Mealcard
                                                    key={mealIndex}
                                                    price={mealDetail.price}
                                                    maxMeals={
                                                        mealDetail.maxMeals
                                                    }
                                                    name={mealDetail.name}
                                                    imageUrl={
                                                        mealDetail.imageUrl
                                                    }
                                                    mealObject={mealDetail}
                                                />
                                            </div>
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
