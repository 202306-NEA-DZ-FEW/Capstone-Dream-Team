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
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "src/util/firebase.js";

function MealCard({ meal, onDelete, maxMeals }) {
    const handleDelete = () => {
        onDelete(meal.id, meal.imageUrl);
    };

    return (
        <div className='flex-col mb-4 w-full'>
            <div className='flex flex-row items-center shadow-xl bg-neutral-100 p-4 w-full'>
                <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className='w-16 h-16 mr-4 rounded-md'
                />
                <div className='flex flex-row items-center w-full bg-neutral-100 ml-4 mr-4'>
                    <div className='text-2xl font-normal w-1/4 font-Poppins leading-tight'>
                        {meal.name}
                    </div>
                    <div className='text-2xl font-normal w-1/4 font-Poppins leading-tight'>
                        Price: {meal.price}
                    </div>
                    <div className='text-2xl font-normal w-1/4 font-Poppins leading-tight'>
                        Meals left: {maxMeals}
                    </div>
                    <div className='flex items-center ml-auto w-1/4'>
                        <button
                            onClick={handleDelete}
                            className='px-2 py-1 shadow-xl bg-red-600 text-white rounded-md ml-auto'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
    const [loading, setLoading] = useState(true);

    const handleImageUpload = async (event) => {
        try {
            setLoading(false);
            const imageFile = event.target.files[0];

            if (imageFile) {
                const storageRef = ref(storage, `images/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                setImageName(imageFile.name);
                const downloadURL = await getDownloadURL(storageRef);
                setImageUrl(downloadURL);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(true);
        }
    };

    const handleCloseModel = () => {
        setMealName("");
        setMaxMeals("");
        setMealPrice("");
        setImageUrl("");
        setImageName("");
        setLoading(false);
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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const restaurantId = user.uid;
                setRestaurantId(restaurantId);
                setRestaurantName(user.displayName);
                fetchMeals(restaurantId);
            } else {
                console.error("User is not logged in as a restaurant.");
            }
        });
        return unsubscribe;
    };

    useEffect(() => {
        const unsubscribe = checkAuthenticationState();

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <main className='max-h-screen overflow-hidden'>
            <div className=''>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='inline-flex items-center justify-center bg-blue-500 px-6 py-2 text-lg text-white font-medium uppercase tracking-wide rounded-md'
                >
                    Add a Meal
                </button>

                {isModalOpen && (
                    <div className=''>
                        <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-auto bg-white outline-none'>
                                    <div className='flex flex-row-reverse'>
                                        <button
                                            onClick={handleCloseModel}
                                            className='rounded-md p-4 inline-flex items-center justify-center text-gray-700  focus:outline-none'
                                        >
                                            <svg
                                                class='h-6 w-6'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                                aria-hidden='true'
                                            >
                                                <path
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    stroke-width='2'
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
                                                Meal Name
                                            </label>
                                            <input
                                                type='text'
                                                value={mealName}
                                                onChange={(e) =>
                                                    setMealName(e.target.value)
                                                }
                                                className='border placeholder-gray-400 focus:outline-none font-semibold w-full p-4 m-0 text-base block bg-white rounded-md'
                                            />
                                        </div>
                                        <div className='relative py-2 flex'>
                                            <label
                                                className='pt-0 pr-2 pb-0 pl-2 absolute -mt-5 mr-0 mb-0 ml-1 font-medium text-gray-600 bg-white cursor-pointer'
                                                htmlFor='file_input'
                                            >
                                                Upload file
                                            </label>
                                            <input
                                                className='hidden w-[100px]'
                                                id='file_input'
                                                type='file'
                                                onChange={handleImageUpload}
                                                maxLength={50}
                                            />
                                            <div className='flex justify-between items-center pr-2 font-semibold m-0 w-full text-base bg-white border rounded-lg cursor-pointer focus:outline-none'>
                                                <label
                                                    htmlFor='file_input'
                                                    className=' p-4 text-clip'
                                                >
                                                    {imageName
                                                        ? imageName
                                                        : "Choose an Image"}
                                                </label>

                                                {loading ? (
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
                                                        } rounded-md inline-flex items-center justify-center pt-0.5 text-gray-700 focus:outline-none line-clamp-1`}
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
                                                                stroke-linecap='round'
                                                                stroke-linejoin='round'
                                                                stroke-width='2'
                                                                d='M6 18L18 6M6 6l12 12'
                                                            />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <div className='p-2 h-6 w-6 border-gray-300 animate-spin rounded-full border-2 border-t-blue-600'></div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className='block'>
                                                Max Meals Per Day
                                            </label>
                                            <input
                                                type='number'
                                                value={maxMeals}
                                                onChange={(e) =>
                                                    setMaxMeals(e.target.value)
                                                }
                                                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                            />
                                        </div>
                                        <div>
                                            <label className='block'>
                                                Meal Price
                                            </label>
                                            <input
                                                type='number'
                                                value={mealPrice}
                                                onChange={(e) =>
                                                    setMealPrice(e.target.value)
                                                }
                                                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                            />
                                        </div>
                                        <div className='flex justify-center'>
                                            <button
                                                type='submit'
                                                className='px-4 py-2 bg-blue-600 text-white rounded-md'
                                            >
                                                Add A Meal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='opacity-25 fixed inset-0 z-40 bg-black' />
                    </div>
                )}

                {isMealAdded && (
                    <div className='fixed inset-x-0 bottom-4 flex items-center justify-center z-50 '>
                        <div className='bg-gray-100 shadow-lg rounded-xl max-w-4xl p-4 text-center'>
                            <p>Meal Added Successfully</p>
                        </div>
                    </div>
                )}

                <div
                    className='grid grid-cols-1 p-8 w-full'
                    style={{ overflowY: "auto", maxHeight: "500px" }}
                >
                    <div className='w-full items-center gap-4'>
                        {meals.map((meal) => (
                            <MealCard
                                key={meal.id}
                                meal={meal}
                                onDelete={handleDeleteMeal}
                                maxMeals={meal.mealsLeft}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AddMeals;
