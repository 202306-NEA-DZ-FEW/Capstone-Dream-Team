import { collection, getDocs, query, where } from "firebase/firestore";
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
            {
                /* adjust the rest_ID*/
            }

            try {
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => {
                    const Donors = doc.data();
                    return {
                        Name: Donors.donor_first_name,
                        meal: Donors.meal_id,

                        numbmeal: Donors.meal_quantity,
                        price: Donors.meal_price,
                        DATE: Donors.date, // Add this line to retrieve the meal
                    };
                });
                setBlogData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchBlogs();
    }, []);

    return (
        <div className='flex-col pl-50'>
            {/* Map through the 'blogData' array and render content for each 'Donors' object. */}
            {blogData.map((Donors, index) => (
                <div className='mb-4' key={index}>
                    {" "}
                    {/* Container for displaying Donor information : img , date , meal ... */}
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
                                {Donors.numbmeal}
                            </div>
                            <div className='text-2xl font-normal font-Poppins leading-tight'>
                                {Donors.price}
                            </div>
                            <div className='text-2xl font-normal font-Poppins leading-tight'>
                                {Donors.DATE}
                            </div>
                        </div>
                    </div>{" "}
                </div>
            ))}
        </div>
    );
}
