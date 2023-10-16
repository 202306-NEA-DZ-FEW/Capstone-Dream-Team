import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    onSnapshot,
} from "firebase/firestore";
import {
    deleteObject, // Import the deleteObject function
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";

function MealCard({ meal, onDelete }) {
    const handleDelete = () => {
        onDelete(meal.id, meal.imageUrl);
    };

    return (
        <div className='w-full flex items-center justify-between p-4 border-b'>
            <div className='flex items-center'>
                <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className='w-16 h-16 rounded-md'
                />
                <div className='ml-4'>
                    <h2 className='text-lg font-semibold'>{meal.name}</h2>
                    <p className='text-gray-600'>
                        ${meal.price} | {meal.maxMeals} meals left
                    </p>
                </div>
            </div>
            <button
                onClick={handleDelete}
                className='px-3 py-2 bg-red-600 text-white rounded-md'
            >
                Delete
            </button>
        </div>
    );
}

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyCj972QFx8ckAdmZQT5uaDYJYewL3ThhAE",
        authDomain: "capstone-project-944c9.firebaseapp.com",
        projectId: "capstone-project-944c9",
        storageBucket: "capstone-project-944c9.appspot.com",
        messagingSenderId: "455661891383",
        appId: "1:455661891383:web:65bbc812478ffda076b4b2",
    };

    const initFirebase = () => {
        return initializeApp(firebaseConfig);
    };

    const initStorage = () => {
        return getStorage(initFirebase());
    };

    const [mealName, setMealName] = useState("");
    const [maxMeals, setMaxMeals] = useState("");
    const [mealPrice, setMealPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [meals, setMeals] = useState([]);

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];

        if (imageFile) {
            try {
                const storage = getStorage(initFirebase());
                const storageRef = ref(storage, `images/${imageFile.name}`);
                const imageFileBuffer = await imageFile.arrayBuffer();
                await uploadBytes(storageRef, new Uint8Array(imageFileBuffer));

                const downloadURL = await getDownloadURL(storageRef);
                setImageUrl(downloadURL);
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(
                collection(getFirestore(initFirebase()), "meals"),
                {
                    name: mealName,
                    maxMeals: Number(maxMeals),
                    price: Number(mealPrice),
                    imageUrl: imageUrl,
                    mealsLeft: Number(maxMeals),
                }
            );
            console.log("Document written with ID: ", docRef.id);

            setMealName("");
            setMaxMeals("");
            setMealPrice("");
            setImageUrl("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const exitForm = () => {
        setIsFormVisible(false);
    };

    const fetchMeals = async () => {
        try {
            const mealsCollection = collection(
                getFirestore(initFirebase()),
                "meals"
            );
            const mealsSnapshot = await getDocs(mealsCollection);

            const mealsData = mealsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMeals(mealsData);
        } catch (error) {
            console.error("Error fetching meals: ", error);
        }
    };

    const handleDeleteMeal = async (mealId, imageUrl) => {
        try {
            const mealDocRef = doc(
                getFirestore(initFirebase()),
                "meals",
                mealId
            );
            await deleteDoc(mealDocRef);

            // Extract the image file name from the URL
            const imageFileName = imageUrl.split("/").pop();

            // Construct a reference to the image in Firebase Storage
            const storage = getStorage(initFirebase());
            const storageRef = ref(storage, `images/${imageFileName}`);

            // Delete the image from Firebase Storage
            await deleteObject(storageRef);
        } catch (error) {
            console.error("Error deleting meal: ", error);
        }
    };

    useEffect(() => {
        fetchMeals();

        const unsubscribe = onSnapshot(
            collection(getFirestore(initFirebase()), "meals"),
            (snapshot) => {
                const updatedMeals = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMeals(updatedMeals);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <main className='ml-60 pt-16 max-h-screen overflow-auto'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-white rounded-3xl p-8 mb-5'>
                    <div className='max-w-4xl mx-auto'>
                        <div className='bg-white rounded-3xl p-8 mb-5'>
                            <h2 className='text-2xl font-semibold mb-5'>
                                Meals List
                            </h2>
                            {meals.map((meal) => (
                                <MealCard
                                    key={meal.id}
                                    meal={meal}
                                    onDelete={handleDeleteMeal}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative bg-cyan-200 overflow-hidden flex-grid max-h-screen'>
                {isFormVisible ? (
                    <div>
                        <button
                            onClick={exitForm}
                            className='px-4 py-2 bg-red-600 text-white rounded-md'
                        >
                            Exit
                        </button>
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
                            <button
                                type='submit'
                                className='px-4 py-2 bg-blue-600 text-white rounded-md'
                            >
                                Add Meal
                            </button>
                        </form>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsFormVisible(true)}
                        className='px-4 py-2 bg-blue-600 text-white rounded-md'
                    >
                        Add Meal
                    </button>
                )}
            </div>
        </main>
    );
}

export default App;
