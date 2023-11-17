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
import { auth, db } from "../../util/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Historycard() {
    const [blogData, setBlogData] = useState([]);
    const { t } = useTranslation("common");
    const [authUser, setAuthUser] = useState(null); // State to store the authenticated user.

    useEffect(() => {
        const user = auth.currentUser;
        // // Use Firebase's 'onAuthStateChanged' to listen for changes in user authentication state.
        onAuthStateChanged(auth, (user) => {
            //     // If a user is authenticated, set 'authUser' to the user; otherwise, set it to null.
            user ? setAuthUser(user) : setAuthUser(null);
        });
        async function fetchBlogs() {
            const q = query(
                collection(db, "donors"),
                where("restaurantId", "==", user.uid)
            );

            try {
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => {
                    const Donors = doc.data();
                    return {
                        Name: Donors.donor_name,
                        meal: Donors.name,
                        numb_meal: Donors.quantity,
                        numbmeal: Donors.active_meal,
                        price: Donors.price,
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
            const donorDocRef = doc(db, "donors", updatedData[index].docId);
            const newNumbmeal = updatedData[index].numbmeal;

            try {
                await updateDoc(donorDocRef, {
                    active_meal: newNumbmeal,
                });
            } catch (error) {
                console.error("Error updating document:", error);
            }
        }
    };

    return (
        <div className='overflow-x-auto'>
            {/* <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'> */}

            <div className='inline-block min-w-full py-2 '>
                {/* <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'> */}

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
                                            className={`rounded-lg whitespace-nowrap px-8 py-4 ${
                                                Donors.numbmeal === 0
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            } w-full h-full pl-8 pr-8 pt-1 pb-1 bg-opacity-20 flex items-center justify-center rounded-md`}
                                            onClick={() =>
                                                handleDecrement(index)
                                            }
                                        >
                                            <div className='text-green-800 text-base font-poppins font-normal leading-6 break-words'>
                                                {Donors.numbmeal}
                                            </div>
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
