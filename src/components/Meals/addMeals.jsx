import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "src/util/firebase.js";

import MealsTable from "./mealsTable";

function AddMeals() {
    const [mealName, setMealName] = useState("");
    const [maxMeals, setMaxMeals] = useState("");
    const [mealPrice, setMealPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageName, setImageName] = useState("");
    const [meals, setMeals] = useState([]);
    const [restaurantId, setRestaurantId] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMealAdded, setIsMealAdded] = useState(false);
    const [loadingForm, setLoadingForm] = useState(true);
    const [loadingTable, setLoadingTable] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation("common");
    const handleImageUpload = async (event) => {
        try {
            setLoadingForm(false);
            const imageFile = event.target.files[0];
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes

            if (imageFile.size > maxSize) {
                // Display an error message or handle the oversized file case
                setError(t("mealsPage.notifications.imageSizeExceedsMax"));
                setLoadingForm(true);
                return;
            }
            if (imageFile) {
                const storageRef = ref(storage, `images/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                setImageName(imageFile.name);
                const downloadURL = await getDownloadURL(storageRef);
                setImageUrl(downloadURL);
                return;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoadingForm(true);
        }
    };

    const handleCloseModel = () => {
        setMealName("");
        setMaxMeals("");
        setMealPrice("");
        setImageUrl("");
        setImageName("");
        setLoadingForm(true);
        setIsModalOpen(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = auth.currentUser;

        if (!restaurantId) {
            console.error("Restaurant ID is missing.");
            return;
        }

        if (user) {
            try {
                const docRef = await addDoc(collection(db, "meals"), {
                    name: mealName,
                    maxMeals: Number(maxMeals),
                    price: Number(mealPrice),
                    imageUrl: imageUrl,
                    mealsLeft: Number(maxMeals),
                    restaurantId: restaurantId,
                    restaurantName: restaurantName,
                });

                fetchMeals(restaurantId);

                handleCloseModel();
                setIsMealAdded(true);

                // Automatically hide the notification after 3 seconds
                setTimeout(() => {
                    setIsMealAdded(false);
                }, 3000);
            } catch (error) {
                console.error("Error adding meal:", error);
            }
        }
    };

    const fetchMeals = async (restaurantId) => {
        try {
            const mealsCollection = collection(db, "meals");
            const mealsQuery = query(
                mealsCollection,
                where("restaurantId", "==", restaurantId)
            );

            const unsubscribe = onSnapshot(mealsQuery, (querySnapshot) => {
                const updatedMeals = [];
                querySnapshot.forEach((doc) => {
                    updatedMeals.push({ id: doc.id, ...doc.data() });
                });
                setMeals(updatedMeals);
                setLoadingTable(false);
            });
            return unsubscribe;
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    const handleDeleteMeal = async (mealId, imageUrl) => {
        try {
            const mealDocRef = doc(db, "meals", mealId);
            await deleteDoc(mealDocRef);

            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);

            setMeals((prevMeals) =>
                prevMeals.filter((meal) => meal.id !== mealId)
            );
        } catch (error) {
            console.error("Error deleting meal:", error);
        }
    };

    const checkAuthenticationState = () => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const restaurantId = user.uid;
                setRestaurantId(restaurantId);
                setRestaurantName(user.displayName);
                await fetchMeals(restaurantId);
            } else {
                console.error("User is not logged in as a restaurant.");
            }
        });
        return unsubscribe;
    };

    useEffect(() => {
        const unsubscribe = checkAuthenticationState();

        return () => {
            setLoadingTable(true);
            unsubscribe();
        };
    }, []);

    return (
        <div>
            <div>
                <div className='sm:flex sm:items-center'>
                    <div className='sm:flex-auto pl-2'>
                        <h1 className='text-xl text-gray-900'>
                            {t("mealsPage.meals.title")}
                        </h1>
                        <p className='text-sm font-semibold text-gray-700'>
                            {t("mealsPage.meals.description")}
                        </p>
                    </div>
                    <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto'
                        >
                            {t("mealsPage.mealForm.addMeal")}
                        </button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className='relative'>
                        <div className='z-50 justify-center items-center flex overflow-y-auto fixed inset-0 outline-none focus:outline-none'>
                            <div className='relative p-4 w-full max-w-md'>
                                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-auto bg-white outline-none'>
                                    <div className='flex flex-row-reverse'>
                                        <button
                                            onClick={handleCloseModel}
                                            className='rounded-md p-4 inline-flex items-center justify-center text-gray-700  focus:outline-none'
                                        >
                                            <svg
                                                className='h-6 w-6'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                                aria-hidden='true'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M6 18L18 6M6 6l12 12'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <form
                                        onSubmit={handleSubmit}
                                        className='space-y-4 p-4'
                                    >
                                        <div className='relative py-2'>
                                            <label className='pt-0 pr-2 pb-0 pl-2 absolute -mt-5 mr-0 mb-0 ml-1 font-medium text-gray-600 bg-white'>
                                                {t(
                                                    "mealsPage.mealForm.mealName"
                                                )}
                                            </label>
                                            <input
                                                type='text'
                                                value={mealName}
                                                onChange={(e) =>
                                                    setMealName(e.target.value)
                                                }
                                                placeholder='Meal Name'
                                                className='border placeholder-gray-400 focus:outline-none font-semibold w-full p-4 m-0 text-base block bg-white rounded-md'
                                            />
                                        </div>
                                        <div className='relative py-2 flex'>
                                            <label
                                                className='pt-0 pr-2 pb-0 pl-2 absolute -mt-5 mr-0 mb-0 ml-1 font-medium text-gray-600 bg-white cursor-pointer'
                                                htmlFor='file_input'
                                            >
                                                {t(
                                                    "mealsPage.mealForm.uploadFile"
                                                )}
                                            </label>
                                            <input
                                                className='hidden'
                                                id='file_input'
                                                type='file'
                                                onChange={handleImageUpload}
                                                accept='.png, .jpg, .jpeg'
                                            />
                                            <div className='flex justify-between items-center p-4 font-semibold m-0 w-full text-base bg-white border rounded-md cursor-pointer focus:outline-none'>
                                                {imageName == "" ? (
                                                    <label
                                                        htmlFor='file_input'
                                                        className='truncate text-gray-400'
                                                    >
                                                        {t(
                                                            "mealsPage.mealForm.chooseImage"
                                                        )}
                                                    </label>
                                                ) : (
                                                    <label
                                                        htmlFor='file_input'
                                                        className='truncate'
                                                    >
                                                        {imageName}
                                                    </label>
                                                )}
                                                {loadingForm ? (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setImageName("");
                                                            setImageUrl("");
                                                        }}
                                                        className={`${
                                                            imageName
                                                                ? ""
                                                                : "hidden"
                                                        } rounded-md inline-flex items-center justify-center pt-0.5 text-gray-700 focus:outline-none`}
                                                    >
                                                        <svg
                                                            className='h-5 w-5'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                            aria-hidden='true'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth='2'
                                                                d='M6 18L18 6M6 6l12 12'
                                                            />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <div className='p-2 h-6 w-6 border-gray-300 animate-spin rounded-full border-2 border-t-blue-600'></div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='relative py-2'>
                                            <label className='pt-0 pr-2 pb-0 pl-2 absolute -mt-5 mr-0 mb-0 ml-1 font-medium text-gray-600 bg-white'>
                                                {t(
                                                    "mealsPage.mealForm.maxMealsPerDay"
                                                )}
                                            </label>
                                            <input
                                                type='number'
                                                value={maxMeals}
                                                onChange={(e) =>
                                                    setMaxMeals(
                                                        parseFloat(
                                                            e.target.value
                                                        ).toFixed(0)
                                                    )
                                                }
                                                placeholder='1'
                                                className='border placeholder-gray-400 focus:outline-none font-semibold w-full p-4 m-0 text-base block bg-white rounded-md'
                                            />
                                        </div>
                                        <div className='relative py-2'>
                                            <label className='pt-0 pr-2 pb-0 pl-2 absolute -mt-5 mr-0 mb-0 ml-1 font-medium text-gray-600 bg-white'>
                                                {t(
                                                    "mealsPage.mealForm.mealPrice"
                                                )}
                                            </label>
                                            <div className='flex border p-4 m-0 placeholder-gray-400 font-semibold  text-base bg-white rounded-md'>
                                                <span className='mx-1 text-gray-400'>
                                                    $
                                                </span>
                                                <input
                                                    value={mealPrice}
                                                    type='number'
                                                    min='0.00'
                                                    max='10000.00'
                                                    step='0.01'
                                                    placeholder='0.00'
                                                    onChange={(e) =>
                                                        setMealPrice(
                                                            e.target.value
                                                        )
                                                    }
                                                    className='w-full focus:outline-none '
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-center'>
                                            <button
                                                type='submit'
                                                className='inline-flex items-center justify-center bg-blue-500 px-6 py-2 text-lg text-white font-medium uppercase tracking-wide rounded-md'
                                            >
                                                {t(
                                                    "mealsPage.mealForm.addMeal"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {error && (
                            <div
                                id='toast-danger'
                                className='z-50 fixed top-0 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow'
                                role='alert'
                            >
                                <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg '>
                                    <svg
                                        className='w-5 h-5'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                    >
                                        <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
                                    </svg>
                                    <span className='sr-only'>Error icon</span>
                                </div>
                                <div className='ml-3 text-sm font-normal'>
                                    {error}
                                </div>
                                <button
                                    type='button'
                                    className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
                                    data-dismiss-target='#toast-danger'
                                    aria-label='Close'
                                    onClick={() => setError(null)}
                                >
                                    <span className='sr-only'>Close</span>
                                    <svg
                                        className='w-3 h-3'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 14 14'
                                    >
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                        <div className='opacity-25 fixed inset-0 z-30 bg-black' />
                    </div>
                )}

                {isMealAdded && (
                    <div
                        id='toast-success'
                        className='z-50 fixed top-0 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 m-4 text-gray-500 bg-white rounded-lg shadow'
                        role='alert'
                    >
                        <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg '>
                            <svg
                                className='w-5 h-5'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                            </svg>
                            <span className='sr-only'>Check icon</span>
                        </div>
                        <div className='ml-3 text-sm font-normal'>
                            {t("mealsPage.notifications.mealAddedSuccessfully")}
                        </div>
                    </div>
                )}
                <div>
                    {loadingTable ? (
                        <div className='flex items-center justify-center '>
                            <div className='fixed top-1/2'>
                                <div className='p-2 h-10 w-10 border-gray-300 animate-spin rounded-full border-2 border-t-blue-600'></div>
                            </div>
                        </div>
                    ) : (
                        <MealsTable meals={meals} onDelete={handleDeleteMeal} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddMeals;
