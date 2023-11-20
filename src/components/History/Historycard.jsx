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
    const [search, setSearch] = useState("");

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

            <div className='py-4 mx-4 md:mx-6'>
                <div className='mt-4 pb-4 flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700'>
                    <div className='mb-2 sm:mb-0 tracking-wider font-light font-roboto'>
                        {t("history.History ")}
                    </div>

                    <div className='flex items-center'>
                        <div>
                            <svg
                                className='fill-stroke text-gray-600 dark:text-white'
                                width={20}
                                height={20}
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z'
                                    stroke='currentColor'
                                    strokeWidth='1.25'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M19.0004 19.0004L14.6504 14.6504'
                                    stroke='currentColor'
                                    strokeWidth='1.25'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </div>

                        <input
                            type='text'
                            placeholder="Search for the donor's name"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            className='focus:outline-none bg-transparent w-full text-sm text-gray-600 mt-2 sm:mt-0 sm:ml-4'
                        />
                    </div>
                </div>
            </div>

            <div className='inline-block min-w-full py-2 '>
                {/* <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'> */}

                <div className='overflow-hidden'>
                    <table className='min-w-full text-center text-sm font-light'>
                        {/* <thead className='border-b bg-gray-50 font-medium text-black dark:border-neutral-500 dark:bg-neutral-900'> */}
                        <thead className='border-b bg-blue-300 bg-opacity-50 font-medium text-Black dark:border-neutral-500 dark:bg-neutral-900'>
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
                            {blogData
                                .filter((Donors) => {
                                    return search.toLowerCase() === ""
                                        ? Donors
                                        : Donors.Name.toLowerCase().includes(
                                              search
                                          );
                                })
                                .map((Donors, index) => (
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
                                                        ? "bg-red-400"
                                                        : "bg-green-300"
                                                } w-full h-full pl-8 pr-8 pt-1 pb-1  flex items-center justify-center rounded-md`}
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
