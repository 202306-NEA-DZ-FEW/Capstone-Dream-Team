import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "src/util/firebase.js";

function MealCard({ meal, onDelete }) {
    const nameRef = useRef(null);

    const handleDelete = () => {
        onDelete(meal.id, meal.imageUrl);
    };

    useEffect(() => {
        const element = nameRef.current;
        const fontSize = getComputedStyle(element).fontSize;
        while (element.scrollWidth > element.offsetWidth) {
            element.style.fontSize = `${
                parseFloat(getComputedStyle(element).fontSize) - 1
            }px`;
        }
    }, [meal]);

    return (
        <div className='p-2 min-w-64 sm:min-w-64 md:min-w-64 lg:min-w-64 xl:min-w-64 flex-col bg-white border-4 rounded-xl flex items-center justify-center'>
            <Image
                src={meal.imageUrl}
                alt={meal.name}
                width={150}
                height={150}
            />
            <div className='p-2 flex flex-col items-center'>
                <h1
                    ref={nameRef}
                    className='font-bold text-lg text-black text-center'
                >
                    {meal.name}
                </h1>
                <h2 className='text-gray-600 pb-2'>
                    ${meal.price} | {meal.maxMeals} meals left
                </h2>
                <button
                    onClick={handleDelete}
                    className='px-3 py-2 bg-red-600 text-white'
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

function AddMeals() {
    const [mealName, setMealName] = useState("");
    const [maxMeals, setMaxMeals] = useState("");
    const [mealPrice, setMealPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [meals, setMeals] = useState([]);
    const [restaurantId, setRestaurantId] = useState("");

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
                });

                // Fetch updated meals and update the state
                fetchMeals(restaurantId);

                setMealName("");
                setMaxMeals("");
                setMealPrice("");
                setImageUrl("");
            } catch (error) {
                console.error("Error adding meal:", error);
            }
        }
    };

    const exitForm = () => {
        setIsFormVisible(false);
    };

    const fetchMeals = async (restaurantId) => {
        try {
            const mealsCollection = collection(db, "meals");
            const mealsQuery = query(
                mealsCollection,
                where("restaurantId", "==", restaurantId)
            );
            const mealsSnapshot = await getDocs(mealsQuery);

            const mealsData = mealsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMeals(mealsData);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    const handleDeleteMeal = async (mealId, imageUrl) => {
        try {
            const mealDocRef = doc(db, "meals", mealId);
            await deleteDoc(mealDocRef);

            // Delete the image from Firebase Storage
            const storageRef = ref(storage, imageUrl); // Use the image URL as the reference
            await deleteObject(storageRef);

            // Fetch updated meals and update the state
            fetchMeals(restaurantId);
        } catch (error) {
            console.error("Error deleting meal:", error);
        }
    };

    const checkAuthenticationState = () => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in, get their restaurant ID and fetch meals
                const restaurantId = user.uid;
                setRestaurantId(restaurantId);
                fetchMeals(restaurantId);
            } else {
                console.log("User is not logged in as a restaurant.");
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
            <div className='max-w-4xl pl-10 pt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                {meals.map((meal) => (
                    <MealCard
                        key={meal.id}
                        meal={meal}
                        onDelete={handleDeleteMeal}
                    />
                ))}
            </div>
            <div className='relative max-w-4xl mx-auto overflow-hidden flex-grid'>
                {isFormVisible ? (
                    <div className='flex justify-center'>
                        <form onSubmit={handleSubmit} className='space-y-4'>
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
                                <label className='block'>Upload Image</label>
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
                            <div className='flex justify-center'>
                                <button
                                    onClick={exitForm}
                                    className='px-4 py-2 bg-red-600 text-white items-center rounded-md'
                                >
                                    Exit
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setIsFormVisible(true)}
                            className='px-4 py-2 bg-blue-600 text-white rounded-md'
                        >
                            Add A Meal
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default AddMeals;
