import {
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
} from "firebase/firestore";
import { useTranslation } from "next-i18next";

import React, { useEffect, useState } from "react";
import { db } from "../../util/firebase";

export default function Historycard() {
    const [blogData, setBlogData] = useState([]);
    const { t } = useTranslation("common");
    //const [authUser, setAuthUser] = useState(null); // State to store the authenticated user.

    //const user = auth.currentUser
    useEffect(() => {
        // // Use Firebase's 'onAuthStateChanged' to listen for changes in user authentication state.
        // onAuthStateChanged(auth, (user) => {
        //     // If a user is authenticated, set 'authUser' to the user; otherwise, set it to null.
        //     user ? setAuthUser(user) : setAuthUser(null);
        // });
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
        // <div className='flex-col pl-50'>
        //     {blogData.map((Donors, index) => (
        //         <div className='mb-4' key={index}>
        //             <div className='bg-neutral-100 rounded-full p-4 flex items-center space-x-3'>
        //                 <img
        //                     className='w-14 h-14 rounded-full'
        //                     src='https://via.placeholder.com/56x56'
        //                 />
        //                 <div className='flex flex-row items-center space-x-60'>
        //                     <div className='text-2xl font-normal font-Poppins leading-tight'>
        //                         {Donors.Name}
        //                     </div>
        //                     <div className='text-2xl font-normal font-Poppins leading-tight'>
        //                         {Donors.meal}
        //                     </div>
        //                     <div className='text-2xl font-normal font-Poppins leading-tight'>
        //                         {Donors.numb_meal}
        //                     </div>
        //                     <div className='text-2xl font-normal font-Poppins leading-tight'>
        //                         {Donors.price}
        //                     </div>
        //                     <div className='text-2xl font-normal font-Poppins leading-tight'>
        //                         {Donors.DATE}
        //                     </div>
        //                     <button
        //                         className={`rounded-xl text-white font-bold text-xl px-4 py-2 ${ Donors.numbmeal === 0 ? "bg-red-500" : "bg-green-500" }`}
        //                         onClick={() => handleDecrement(index)}
        //                     > {Donors.numbmeal}  </button>
        //                 </div>
        //             </div>{" "}
        //         </div>
        //     ))}
        // </div>

        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-hidden'>
                    <table className='min-w-full text-center text-sm font-light'>
                        <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                            <tr>
                                <th scope='col' className=' px-6 py-4'>
                                    {t("history.Doner")}
                                </th>
                                <th scope='col' className=' px-6 py-4'>
                                    {t("history.Meal")}
                                </th>
                                <th scope='col' className=' px-6 py-4'>
                                    {t("history.Quantity")}
                                </th>
                                <th scope='col' className=' px-6 py-4'>
                                    {t("history.Price")}
                                </th>
                                <th scope='col' className=' px-6 py-4'>
                                    {t("history.Date")}
                                </th>
                                <th scope='col' className=' px-6 py-4'>
                                    {t("history.UsedMeals")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogData.map((Donors, index) => (
                                <tr
                                    className='border-b dark:border-neutral-500'
                                    key={index}
                                >
                                    <td className='whitespace-nowrap  px-6 py-4 font-medium'>
                                        {Donors.Name}
                                    </td>
                                    <td className='whitespace-nowrap  px-6 py-4'>
                                        {Donors.meal}
                                    </td>
                                    <td className='whitespace-nowrap  px-6 py-4'>
                                        {Donors.numb_meal}
                                    </td>
                                    <td className='whitespace-nowrap  px-6 py-4'>
                                        {Donors.price} £
                                    </td>
                                    <td className='whitespace-nowrap  px-6 py-4'>
                                        {Donors.DATE}
                                    </td>
                                    <td className='whitespace-nowrap  px-6 py-4'>
                                        {" "}
                                        <button
                                            className={`rounded-xl whitespace-nowrap px-4 py-2 ${
                                                Donors.numbmeal === 0
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                            onClick={() =>
                                                handleDecrement(index)
                                            }
                                        >
                                            {" "}
                                            {Donors.numbmeal}{" "}
                                        </button>{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
