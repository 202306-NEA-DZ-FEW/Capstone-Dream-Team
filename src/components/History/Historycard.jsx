import {
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../util/firebase";

export default function Historycard() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        async function fetchBlogs() {
            const q = query(
                collection(db, "Donors"),
                where("restaurant_id", "==", 3)
            );

            try {
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => {
                    const Donors = doc.data();
                    return {
                        Name: Donors.donor_first_name,
                        meal: Donors.meal_id,
                        numb_meal: Donors.meal_quantity,
                        numbmeal: Donors.meal_quantity,
                        price: Donors.meal_price,
                        DATE: Donors.date,
                        docId: doc.id, // Add the Firestore document ID
                    };
                });
                setBlogData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchBlogs();
    }, []);

    const handleDecrement = async (index) => {
        const updatedData = [...blogData];

        if (updatedData[index].numbmeal > 0) {
            updatedData[index].numbmeal -= 1;
            setBlogData(updatedData);

            // Update the Firestore document with the new value
            const donorDocRef = doc(db, "Donors", updatedData[index].docId);
            const newNumbmeal = updatedData[index].numbmeal;

            try {
                await updateDoc(donorDocRef, {
                    meal_quantity: newNumbmeal,
                });
            } catch (error) {
                console.error("Error updating document:", error);
            }
        }
    };

    return (
        <div className='flex-col pl-50'>
            {blogData.map((Donors, index) => (
                <div className='mb-4' key={index}>
                    <div className='bg-neutral-100 rounded-full p-4 flex items-center space-x-3'>
                        <img
                            className='w-14 h-14 rounded-full'
                            src='https://via.placeholder.com/56x56'
                        />
                        <div className='flex flex-row items-center space-x-60'>
                            <div className='text-2xl font-normal font-Poppins leading-tight'>
                                {Donors.Name}
                            </div>
                            <div className='text-2xl font-normal font-Poppins leading-tight'>
                                {Donors.meal}
                            </div>
                            <div className='text-2xl font-normal font-Poppins leading-tight'>
                                {Donors.numb_meal}
                            </div>
                            <div className='text-2xl font-normal font-Poppins leading-tight'>
                                {Donors.price}
                            </div>
                            <div className='text-2xl font-normal font-Poppins leading-tight'>
                                {Donors.DATE}
                            </div>
                            <button
                                className={`rounded-xl text-white font-bold text-xl px-4 py-2 ${
                                    Donors.numbmeal === 0
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                }`}
                                onClick={() => handleDecrement(index)}
                            >
                                {Donors.numbmeal}
                            </button>
                        </div>
                    </div>{" "}
                </div>
            ))}
        </div>
    );
}
