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
    const [meals, setMeals] = useState([]);
    const [restaurantId, setRestaurantId] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMealAdded, setIsMealAdded] = useState(false);

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];

        if (imageFile) {
            try {
                const storageRef = ref(storage, `images/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);

                const downloadURL = await getDownloadURL(storageRef);
                setImageUrl(downloadURL);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
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

                setMealName("");
                setMaxMeals("");
                setMealPrice("");
                setImageUrl("");
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
        <main className='max-h-screen'>
            <div className='flex w-full'>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='px-4 py-2 bg-blue-600 text-white rounded-md fixed mb-6 top-4 right-4 z-10'
                >
                    Add a Meal
                </button>

                {isModalOpen && (
                    <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75'>
                        <div className='bg-gray-100 shadow-lg rounded-xl max-w-4xl mx-auto relative'>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='absolute top-4 right-4 p-2 mb-2 text-gray-500 hover:text-gray-700 cursor-pointer'
                            >
                                X
                            </button>
                            <form
                                onSubmit={handleSubmit}
                                className='space-y-4 p-4'
                            >
                                <div>
                                    <label className='block'>Meal Name</label>
                                    <input
                                        type='text'
                                        value={mealName}
                                        onChange={(e) =>
                                            setMealName(e.target.value)
                                        }
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                    />
                                </div>
                                <div>
                                    <label className='block'>
                                        Upload Image
                                    </label>
                                    <input
                                        type='file'
                                        onChange={handleImageUpload}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                    />
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
                                    <label className='block'>Meal Price</label>
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
                        {meals.slice(0, 5).map((meal) => (
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
